import { Link } from "@tanstack/react-router";
import { chromeBlocks } from "@/lib/pages/chrome";
import { anchorMode } from "@/lib/pages/links";
import type { ResolvedBlock } from "@/lib/pages/resolve";
import type { PageDocument } from "@/lib/pages/types";

function ChromeBlock({ block }: { block: ResolvedBlock }) {
  if (block.type === "buttons") {
    return (
      <ul className="flex flex-wrap items-center gap-1">
        {block.props.buttons.map((item) => (
          <li key={`${item.label}-${item.href}`}>
            {anchorMode(item.href, item.target) === "route" ? (
              <Link to={item.href as "/events"} className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-mist no-underline hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                target={anchorMode(item.href, item.target) === "blank" ? "_blank" : undefined}
                rel={anchorMode(item.href, item.target) === "blank" ? "noreferrer" : undefined}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-mist no-underline hover:text-ink"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      {block.props.title ? <p className="text-sm font-medium">{block.props.title}</p> : null}
      {block.props.subtitle ? <p className="mt-1 text-sm text-mist">{block.props.subtitle}</p> : null}
      {block.props.body ? <p className="mt-2 max-w-md whitespace-pre-wrap text-sm leading-relaxed text-mist">{block.props.body}</p> : null}
    </div>
  );
}

export function ChromeBlocks({ document }: { document?: PageDocument }) {
  const blocks = chromeBlocks(document);
  if (!blocks.length) return null;
  return (
    <>
      {blocks.map((block) => (
        <div key={block.id} data-chrome-section={block.props.sectionName} data-block-type={block.type}>
          <ChromeBlock block={block} />
        </div>
      ))}
    </>
  );
}
