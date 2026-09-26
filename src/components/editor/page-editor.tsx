import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useBlocker } from "@tanstack/react-router";
import { zenEditorConfig } from "@/components/editor/puck-config";
import type { ContentCatalog } from "@/lib/pages/resolve";
import { documentToPuck } from "@/lib/pages/puck-data";
import { PAGE_KEYS, PAGE_LABELS, type PageKey, type PageStore } from "@/lib/pages/types";
import { publishPage, restorePage, savePageDraft } from "@/lib/server/pages";

type EditorApi = {
  role: string;
  dirty: boolean;
  message: string;
  save: () => void;
  publish: () => void;
  restore: () => void;
};

const EditorActions = createContext<EditorApi | null>(null);

function HeaderActions() {
  const api = useContext(EditorActions);
  if (!api) return <span />;
  const canWrite = api.role === "editor" || api.role === "admin";
  const canPublish = api.role === "admin";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {canWrite ? (
        <button type="button" className="min-h-11 rounded-full bg-leaf px-3 text-sm text-leaf-fg" onClick={api.save}>
          儲存草稿
        </button>
      ) : null}
      {canPublish ? (
        <>
          <button type="button" className="min-h-11 rounded-full bg-ink px-3 text-sm text-raised" onClick={api.publish}>
            發布
          </button>
          <button
            type="button"
            className="min-h-11 rounded-full border border-line px-3 text-sm"
            onClick={() => {
              if (window.confirm("還原成預設版型？這會取代目前的草稿和已發布內容。")) api.restore();
            }}
          >
            還原預設
          </button>
        </>
      ) : null}
      <span className="text-xs text-mist">{api.dirty ? "有尚未儲存的修改" : api.message}</span>
    </div>
  );
}

export function PageEditor({
  role,
  initial,
  catalog,
}: {
  role: string;
  initial: PageStore;
  catalog: ContentCatalog;
}) {
  const [pageKey, setPageKey] = useState<PageKey>("home");
  const [store, setStore] = useState(initial);
  const [data, setData] = useState<Data>(() => documentToPuck(initial.pages.home.draft) as Data);
  const [saved, setSaved] = useState(() => JSON.stringify(documentToPuck(initial.pages.home.draft)));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dirty = JSON.stringify(data) !== saved;
  const record = store.pages[pageKey];
  const unpublished = JSON.stringify(record.draft) !== JSON.stringify(record.published);
  const blocker = useBlocker({ shouldBlockFn: () => dirty, enableBeforeUnload: () => dirty, withResolver: true });

  useEffect(() => {
    if (blocker.status !== "blocked") return;
    const ok = window.confirm("有尚未儲存的修改，確定要離開？");
    if (ok) blocker.proceed();
    else blocker.reset();
  }, [blocker]);

  const api = useMemo<EditorApi>(
    () => ({
      role,
      dirty,
      message,
      save: () => {
        setError("");
        void savePageDraft({ data: { pageKey, document: data } })
          .then((result) => {
            setStore(result.store);
            setSaved(JSON.stringify(data));
            setMessage("草稿已儲存");
          })
          .catch(() => setError("沒有存成。請確認你是 editor 或 admin。"));
      },
      publish: () => {
        setError("");
        void publishPage({ data: { pageKey, document: data } })
          .then((result) => {
            setStore(result.store);
            setSaved(JSON.stringify(data));
            setMessage("已發布。重新整理前台會看到這版。");
          })
          .catch(() => setError("沒有發布。只有 admin 可以發布。"));
      },
      restore: () => {
        setError("");
        void restorePage({ data: { pageKey } })
          .then((result) => {
            const next = documentToPuck(result.store.pages[pageKey].draft) as Data;
            setStore(result.store);
            setData(next);
            setSaved(JSON.stringify(next));
            setMessage("已還原成預設版型並發布");
          })
          .catch(() => setError("沒有還原。只有 admin 可以還原。"));
      },
    }),
    [data, dirty, message, pageKey, role],
  );

  return (
    <EditorActions.Provider value={api}>
      <div className="flex h-full min-h-0 flex-col bg-canvas">
        <div className="flex flex-wrap items-center gap-3 border-b border-line bg-raised px-3 py-2">
          <label className="text-sm">
            頁面
            <select
              className="ml-2 h-11 rounded-md border border-line bg-paper px-2"
              value={pageKey}
              aria-label="選擇頁面"
              onChange={(event) => {
                const nextKey = event.target.value as PageKey;
                if (dirty && !window.confirm("這一頁有尚未儲存的修改，確定切換？")) return;
                setPageKey(nextKey);
                const next = documentToPuck(store.pages[nextKey].draft) as Data;
                setData(next);
                setSaved(JSON.stringify(next));
                setMessage("");
                setError("");
              }}
            >
              {PAGE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {PAGE_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-mist">
            {role === "viewer" ? "你是 viewer，只能預覽。" : null}
            {role === "editor" ? "你是 editor，可以改草稿，不能發布或還原。" : null}
            {unpublished ? "有尚未發布的修改。" : "草稿和正式版一致。"}
            {record.draftUpdatedAt ? ` 草稿 ${record.draftUpdatedAt} ${record.draftUpdatedBy ?? ""}` : ""}
            {record.publishedAt ? ` 發布 ${record.publishedAt} ${record.publishedBy ?? ""}` : ""}
          </p>
          {error ? <p className="text-sm text-coral">{error}</p> : null}
        </div>
        <div className="zen-editor min-h-0 flex-1">
          <Puck
            config={zenEditorConfig}
            data={data}
            onChange={(next) => {
              setData((current) => (JSON.stringify(current) === JSON.stringify(next) ? current : next));
            }}
            permissions={
              role === "viewer"
                ? { drag: false, duplicate: false, delete: false, edit: false, insert: false }
                : { drag: true, duplicate: true, delete: true, edit: true, insert: true }
            }
            iframe={{ enabled: true, syncHostStyles: true, waitForStyles: true }}
            viewports={[
              { width: 1280, height: "auto", label: "桌面", icon: "Monitor" },
              { width: 390, height: "auto", label: "手機 390", icon: "Smartphone" },
            ]}
            dnd={{ behavior: "static" }}
            metadata={{ catalog }}
            overrides={{ headerActions: HeaderActions }}
            onAction={(action, _state, previous) => {
              if (action.type !== "remove") return;
              if (window.confirm("要刪除這個區塊嗎？")) return;
              setData(previous.data);
            }}
          />
        </div>
      </div>
    </EditorActions.Provider>
  );
}
