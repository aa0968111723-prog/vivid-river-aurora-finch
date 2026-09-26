import { mergePageDocument } from "./merge.ts";
import type { BlockNode, PageDocument, PageKey } from "./types.ts";

export type PuckNode = { type: string; props: Record<string, unknown> };
export type PuckData = {
  root: { props: Record<string, unknown> };
  content: PuckNode[];
  zones?: Record<string, PuckNode[]>;
};

const SLOT_NAMES = ["col1", "col2", "col3"] as const;

function toPuckNode(block: BlockNode, zones: Record<string, PuckNode[]>): PuckNode {
  const props: Record<string, unknown> = {
    ...block.props,
    id: block.id,
    dwell: block.props.dwellMs.map((ms) => ({ ms })),
    manualIds: block.props.ids.map((id) => ({ id })),
  };
  if (block.type === "columns") {
    (block.slots ?? [[], [], []]).slice(0, 3).forEach((column, index) => {
      zones[`${block.id}:${SLOT_NAMES[index]}`] = column.map((child) => toPuckNode(child, zones));
    });
  }
  return { type: block.type, props };
}

export function documentToPuck(document: PageDocument): PuckData {
  const zones: Record<string, PuckNode[]> = {};
  const content = document.blocks.map((block) => toPuckNode(block, zones));
  return { root: { props: { title: "" } }, content, zones };
}

function fromPuckNode(node: PuckNode, zones: Record<string, PuckNode[]>, index: number): unknown {
  const props = { ...node.props };
  const id = typeof props.id === "string" ? props.id : `block-${index + 1}`;
  delete props.id;
  if (Array.isArray(props.dwell)) props.dwellMs = props.dwell;
  if (Array.isArray(props.manualIds)) props.ids = props.manualIds;
  delete props.dwell;
  delete props.manualIds;
  delete props.col1;
  delete props.col2;
  delete props.col3;
  const slots = SLOT_NAMES.map((name) => (zones[`${id}:${name}`] ?? []).map((child, childIndex) => fromPuckNode(child, zones, childIndex)));
  return {
    id,
    type: node.type,
    props,
    slots: slots.some((column) => column.length) || node.type === "columns" ? slots : undefined,
  };
}

export function puckToDocument(data: PuckData, page: PageKey): PageDocument {
  const zones = data.zones ?? {};
  const raw = {
    version: 1,
    blocks: (data.content ?? []).map((node, index) => fromPuckNode(node, zones, index)),
  };
  return mergePageDocument(raw, page);
}
