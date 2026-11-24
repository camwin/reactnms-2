import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { c as deviceById, i as useNms, r as cn } from "./router-Cx8VRzWZ.mjs";
import { r as SeverityMark } from "./bits-FvHip-Fx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-CRIUgVHx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var button = cva("inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 min-h-11 px-3", {
	variants: { tone: {
		solid: "bg-accent text-accent-ink hover:bg-accent/90",
		ghost: "bg-transparent text-fg hover:bg-raised",
		line: "border border-line bg-surface text-fg hover:bg-raised"
	} },
	defaultVariants: { tone: "line" }
});
function Button({ className, tone, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(button({ tone }), className),
		...props
	});
}
var FILTERS = [
	{
		id: "open",
		label: "Open"
	},
	{
		id: "critical",
		label: "Critical"
	},
	{
		id: "warning",
		label: "Warning"
	},
	{
		id: "info",
		label: "Info"
	},
	{
		id: "all",
		label: "All"
	}
];
function AlertsPage() {
	const alerts = useNms((state) => state.alerts);
	const devices = useNms((state) => state.devices);
	const acked = useNms((state) => state.acked);
	const toggleAck = useNms((state) => state.toggleAck);
	const ackOpen = useNms((state) => state.ackOpen);
	const [filter, setFilter] = (0, import_react.useState)("open");
	const rows = alerts.filter((alert) => {
		if (filter === "open") return !acked[alert.id] && alert.severity !== "info";
		if (filter === "all") return true;
		return alert.severity === filter;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Alerts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Acknowledge stays in this session."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					tone: "line",
					onClick: ackOpen,
					children: "Ack open"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setFilter(item.id),
					className: cn("min-h-11 shrink-0 rounded-full border px-4 text-sm", filter === item.id ? "border-accent bg-accent/10 text-accent" : "border-line bg-surface text-muted"),
					children: item.label
				}, item.id))
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-line bg-surface px-4 py-8 text-sm text-muted",
				children: "Nothing in this view."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: rows.map((alert) => {
					const device = deviceById(devices, alert.deviceId);
					const done = Boolean(acked[alert.id]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-surface px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: alert.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-faint",
									children: alert.ago
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-base font-semibold",
								children: alert.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-pretty text-muted",
								children: alert.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center justify-between gap-3",
								children: [device ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/devices/$deviceId",
									params: { deviceId: device.id },
									className: "font-mono text-sm text-accent",
									children: [device.hostname, alert.iface ? ` · ${alert.iface}` : ""]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									tone: done ? "ghost" : "line",
									onClick: () => toggleAck(alert.id),
									"aria-pressed": done,
									children: done ? "Acknowledged" : "Acknowledge"
								})]
							})
						]
					}, alert.id);
				})
			})
		]
	});
}
//#endregion
export { AlertsPage as component };
