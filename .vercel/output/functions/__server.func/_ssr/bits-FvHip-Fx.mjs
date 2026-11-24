import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./router-Cx8VRzWZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bits-FvHip-Fx.js
var import_jsx_runtime = require_jsx_runtime();
var healthText = {
	up: "text-accent",
	warn: "text-warn",
	down: "text-down"
};
var healthBg = {
	up: "bg-accent",
	warn: "bg-warn",
	down: "bg-down"
};
var healthLabel = {
	up: "Up",
	warn: "Warning",
	down: "Down"
};
function StatusDot({ status, pulse = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block size-2 shrink-0 rounded-full", healthBg[status], pulse && status !== "down" && "live-dot"),
		"aria-hidden": true
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 text-sm", healthText[status]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status }), healthLabel[status]]
	});
}
var severityText = {
	critical: "text-down",
	warning: "text-warn",
	info: "text-muted"
};
function SeverityMark({ severity }) {
	const label = severity === "critical" ? "Critical" : severity === "warning" ? "Warning" : "Info";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-mono text-xs uppercase tracking-widest", severityText[severity]),
		children: label
	});
}
function UtilBar({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "block h-1.5 w-full overflow-hidden rounded-full bg-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("block h-full rounded-full", value >= 80 ? "bg-down" : value >= 65 ? "bg-warn" : "bg-accent"),
			style: { width: `${Math.max(0, Math.min(100, value))}%` }
		})
	});
}
function Metric({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs uppercase tracking-widest text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-2xl font-semibold tabular-nums tracking-tight",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm text-muted",
				children: hint
			}) : null
		]
	});
}
function Panel({ title, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border border-line bg-surface", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-xs uppercase tracking-widest text-faint",
				children: title
			}), action]
		}), children]
	});
}
//#endregion
export { StatusPill as a, StatusDot as i, Panel as n, UtilBar as o, SeverityMark as r, Metric as t };
