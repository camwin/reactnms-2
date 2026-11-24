import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/traffic-chart-CqB5IIfN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrafficChart({ data, label }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-52",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-52 w-full",
		role: "img",
		"aria-label": label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 12,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-faint)",
							fontSize: 11,
							fontFamily: "var(--font-mono)"
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-faint)",
							fontSize: 11,
							fontFamily: "var(--font-mono)"
						},
						axisLine: false,
						tickLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						cursor: { stroke: "var(--color-line)" },
						contentStyle: {
							background: "var(--color-raised)",
							border: "1px solid var(--color-line)",
							borderRadius: 12,
							color: "var(--color-fg)",
							fontSize: 12
						},
						formatter: (value, name) => [`${value} Mb/s`, name === "inMbps" ? "In" : "Out"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "inMbps",
						stroke: "var(--color-accent)",
						fill: "var(--color-accent)",
						fillOpacity: .16,
						strokeWidth: 2,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "outMbps",
						stroke: "var(--color-warn)",
						fill: "var(--color-warn)",
						fillOpacity: .08,
						strokeWidth: 2,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
//#endregion
export { TrafficChart as t };
