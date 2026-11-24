import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as deviceById, i as useNms, r as cn, u as layout } from "./router-Cx8VRzWZ.mjs";
import { a as StatusPill } from "./bits-FvHip-Fx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topology-CUvk3GTy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var stroke = {
	up: "stroke-accent",
	warn: "stroke-warn",
	down: "stroke-down"
};
var fill = {
	up: "fill-accent",
	warn: "fill-warn",
	down: "fill-down"
};
function TopologyPage() {
	const devices = useNms((state) => state.devices);
	const links = useNms((state) => state.links);
	const [selected, setSelected] = (0, import_react.useState)("asnb");
	const current = selected ? deviceById(devices, selected) : void 0;
	const attached = current ? links.filter((link) => link.a === current.id || link.b === current.id) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Topology"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Logical fabric. Swipe the map on a phone, then pick a node."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-xl border border-line bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 1080 700",
						className: "h-auto w-[720px] max-w-none sm:w-full",
						role: "img",
						"aria-label": "Bayline Metro logical topology",
						children: [links.map((link) => {
							const a = layout[link.a];
							const b = layout[link.b];
							const left = deviceById(devices, link.a);
							const right = deviceById(devices, link.b);
							if (!a || !b || !left || !right) return null;
							const dead = left.status === "down" || right.status === "down" || link.util === 0;
							const hot = link.util >= 65;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: a.x,
								y1: a.y,
								x2: b.x,
								y2: b.y,
								className: dead ? "stroke-down" : hot ? "stroke-warn" : "stroke-line",
								strokeWidth: dead ? 2 : 2 + link.util / 40
							}, link.id);
						}), devices.map((device) => {
							const point = layout[device.id];
							if (!point) return null;
							const on = selected === device.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								role: "button",
								tabIndex: 0,
								"aria-label": device.hostname,
								"aria-pressed": on,
								className: "cursor-pointer",
								onClick: () => setSelected(device.id),
								onKeyDown: (event) => {
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										setSelected(device.id);
									}
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: point.x,
										cy: point.y,
										r: on ? 28 : 22,
										className: cn("fill-raised", stroke[device.status]),
										strokeWidth: on ? 4 : 2.5
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: point.x,
										cy: point.y,
										r: 5,
										className: fill[device.status]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: point.x + 22,
										y: point.y - 13,
										width: device.short.length * 9 + 12,
										height: 24,
										rx: 5,
										className: "fill-raised"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: point.x + 28,
										y: point.y + 4,
										className: "fill-fg font-mono",
										fontSize: "14",
										children: device.short
									})
								]
							}, device.id);
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-4 border-t border-line px-4 py-3 font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "Up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-warn",
							children: "Warning or hot link"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-down",
							children: "Down"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-line bg-surface px-4 py-4",
				children: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-mono text-lg font-semibold",
								children: current.hostname
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									current.role,
									" · ",
									current.site,
									" · ",
									current.model
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: current.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm tabular-nums text-muted",
							children: [
								current.ip,
								" · CPU ",
								current.status === "down" ? "—" : `${current.cpu}%`,
								" · mem",
								" ",
								current.status === "down" ? "—" : `${current.mem}%`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-1 text-sm text-muted",
							children: attached.map((link) => {
								const otherId = link.a === current.id ? link.b : link.a;
								const other = deviceById(devices, otherId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "min-h-11 text-left",
									onClick: () => setSelected(otherId),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-fg",
										children: other?.short
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [" · ", link.util === 0 ? "down" : `${link.util}%`]
									})]
								}) }, link.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/devices/$deviceId",
							params: { deviceId: current.id },
							className: "inline-flex min-h-11 items-center text-sm text-accent",
							children: "Open device"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Select a node to see adjacencies."
				})
			})
		]
	});
}
//#endregion
export { TopologyPage as component };
