import "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as require_jsx_runtime, l as require_react, s as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,transform,opacity] duration-150 ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-leaf text-leaf-fg hover:bg-leaf/90",
			coral: "bg-coral text-coral-fg hover:bg-coral/90",
			outline: "border border-line bg-raised text-ink hover:bg-paper",
			ghost: "text-ink hover:bg-paper",
			link: "text-leaf underline-offset-4 hover:underline rounded-none"
		},
		size: {
			default: "h-11 min-h-11 px-5",
			sm: "h-9 min-h-9 px-4 text-sm",
			lg: "h-12 min-h-12 px-6 text-base",
			icon: "size-11 p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { cn as n, Button as t };
