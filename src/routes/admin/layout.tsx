import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageEditor } from "@/components/editor/page-editor";
import type { ContentCatalog } from "@/lib/pages/resolve";
import { getPageEditorState } from "@/lib/server/pages";
import { getSiteMeta, loadPublicCatalog } from "@/lib/server/public";
import type { PageStore } from "@/lib/pages/types";

export const Route = createFileRoute("/admin/layout")({
  component: LayoutAdmin,
});

function LayoutAdmin() {
  const [role, setRole] = useState("viewer");
  const [store, setStore] = useState<PageStore | null>(null);
  const [catalog, setCatalog] = useState<ContentCatalog | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void Promise.all([getPageEditorState(), loadPublicCatalog(), getSiteMeta()])
      .then(([editor, lists, meta]) => {
        setRole(editor.role);
        setStore(editor.store);
        setCatalog({
          events: lists.events,
          stories: lists.stories,
          faq: lists.faq,
          instagram: lists.instagram,
          photos: lists.photos,
          posters: lists.posters,
          announcement: meta.announcement,
        });
      })
      .catch(() => setError("讀不到排版。請重新登入後台。"));
  }, []);

  if (error) return <p className="p-6 text-sm text-coral">{error}</p>;
  if (!store || !catalog) return <p className="p-6 text-sm text-mist">讀取頁面編輯器…</p>;
  return <PageEditor role={role} initial={store} catalog={catalog} />;
}
