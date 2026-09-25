import "../_runtime.mjs";
import { r as cn } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md border border-line bg-raised px-3 text-sm text-ink placeholder:text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/40", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-ink placeholder:text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/40", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-ink", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
