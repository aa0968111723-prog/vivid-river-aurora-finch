export type PageAction = "preview" | "write" | "publish" | "restore" | "settings";

export function roleAllows(role: string, action: PageAction): boolean {
  if (role !== "admin" && role !== "editor" && role !== "viewer") return false;
  if (action === "preview") return true;
  if (action === "write") return role === "editor" || role === "admin";
  return role === "admin";
}
