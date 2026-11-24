import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as deviceById, d as peakUtil, i as useNms, o as countHealth } from "./router-Cx8VRzWZ.mjs";
import { i as StatusDot, n as Panel, o as UtilBar, r as SeverityMark, t as Metric } from "./bits-FvHip-Fx.mjs";
import { t as TrafficChart } from "./traffic-chart-CqB5IIfN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AKxjIhEF.js
var import_jsx_runtime = require_jsx_runtime();
function Overview() {
	const devices = useNms((state) => state.devices);
	const ifaces = useNms((state) => state.ifaces);
	const alerts = useNms((state) => state.alerts);
	const acked = useNms((state) => state.acked);
	const samples = useNms((state) => state.samples);
	const health = countHealth(devices);
	const open = alerts.filter((alert) => !acked[alert.id]);
	const critical = open.filter((alert) => alert.severity === "critical").length;
	const warning = open.filter((alert) => alert.severity === "warning").length;
	const hottest = [...ifaces].filter((row) => row.operUp).sort((a, b) => Math.max(b.utilIn, b.utilOut) - Math.max(a.utilIn, a.utilOut)).slice(0, 5);
	const latest = samples[samples.length - 1];
	const sites = Array.from(new Set(devices.map((device) => device.site)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Fabric overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-pretty text-muted",
				children: [
					critical,
					" critical and ",
					warning,
					" warning across ",
					devices.length,
					" polled devices. Simulated SNMP, not a live network."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Up",
						value: String(health.up),
						hint: `${health.warn} warning · ${health.down} down`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Open alerts",
						value: String(open.length),
						hint: `${critical} critical`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Ingress",
						value: latest ? String(latest.inMbps) : "—",
						hint: "Mb/s, last sample"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Sites",
						value: String(sites.length),
						hint: "POP through wireless"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-3",
					title: "Aggregate traffic",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-3 font-mono text-xs text-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "In"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-warn",
							children: "Out"
						})]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficChart, {
						data: samples,
						label: "Aggregate ingress and egress over the day, megabits per second"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					className: "lg:col-span-2",
					title: "Open alerts",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/alerts",
						className: "text-sm text-accent",
						children: "All"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [open.slice(0, 5).map((alert) => {
						const device = deviceById(devices, alert.deviceId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-b border-line px-4 py-3 last:border-b-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: alert.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-faint",
										children: alert.ago
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/devices/$deviceId",
									params: { deviceId: alert.deviceId },
									className: "mt-1 block text-sm font-medium",
									children: alert.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-mono text-xs text-muted",
									children: device?.hostname
								})
							]
						}, alert.id);
					}), open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-4 py-6 text-sm text-muted",
						children: "Queue is clear."
					}) : null] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Hottest interfaces",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: hottest.map((row) => {
					const device = deviceById(devices, row.deviceId);
					const peak = Math.max(row.utilIn, row.utilOut);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line last:border-b-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/devices/$deviceId",
							params: { deviceId: row.deviceId },
							className: "grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_8rem_4.5rem]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-mono text-sm",
										children: row.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-muted",
										children: device?.hostname
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden truncate text-sm text-muted sm:block",
									children: row.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtilBar, { value: peak })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-right font-mono text-sm tabular-nums",
									children: [peak, "%"]
								})
							]
						})
					}, row.id);
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Sites",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3",
					children: sites.map((site) => {
						const members = devices.filter((device) => device.site === site);
						const siteHealth = countHealth(members);
						const tone = siteHealth.down > 0 ? "down" : siteHealth.warn > 0 ? "warn" : "up";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 bg-surface px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusDot, { status: tone }), site]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: [
									siteHealth.up,
									"/",
									members.length,
									" up · ",
									peakUtil(ifaces.filter((row) => members.some((device) => device.id === row.deviceId))),
									"%"
								]
							})]
						}, site);
					})
				})
			})
		]
	});
}
//#endregion
export { Overview as component };
