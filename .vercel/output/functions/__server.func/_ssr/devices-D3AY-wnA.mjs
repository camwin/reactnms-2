import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Search, o as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as compareDevices, d as peakUtil, i as useNms, l as formatUptime, r as cn } from "./router-Cx8VRzWZ.mjs";
import { a as StatusPill, o as UtilBar } from "./bits-FvHip-Fx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/devices-D3AY-wnA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "down",
		label: "Down"
	},
	{
		id: "warn",
		label: "Warning"
	},
	{
		id: "up",
		label: "Up"
	}
];
function DevicesPage() {
	const devices = useNms((state) => state.devices);
	const ifaces = useNms((state) => state.ifaces);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return devices.filter((device) => filter === "all" ? true : device.status === filter).filter((device) => {
			if (!needle) return true;
			return [
				device.hostname,
				device.ip,
				device.site,
				device.role,
				device.model,
				device.vendor
			].join(" ").toLowerCase().includes(needle);
		}).sort(compareDevices);
	}, [
		devices,
		filter,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Devices"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [rows.length, " shown · problems sort first"]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "size-4 text-faint",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Hostname, IP, site, role",
					className: "h-11 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-faint"
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
				children: "Nothing matches that filter."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "overflow-hidden rounded-xl border border-line bg-surface",
				children: rows.map((device) => {
					const peak = peakUtil(ifaces.filter((row) => row.deviceId === device.id && row.operUp));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line last:border-b-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/devices/$deviceId",
							params: { deviceId: device.id },
							className: "flex items-center gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate font-mono text-sm",
											children: device.hostname
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: device.status })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 block truncate text-sm text-muted",
										children: [
											device.ip,
											" · ",
											device.site,
											" · ",
											device.role
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtilBar, { value: device.status === "down" ? 0 : peak }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs tabular-nums text-muted",
											children: [
												"CPU ",
												device.status === "down" ? "—" : `${device.cpu}%`,
												" · ",
												formatUptime(device.uptimeSec)
											]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "size-4 shrink-0 text-faint",
								"aria-hidden": true
							})]
						})
					}, device.id);
				})
			})
		]
	});
}
//#endregion
export { DevicesPage as component };
