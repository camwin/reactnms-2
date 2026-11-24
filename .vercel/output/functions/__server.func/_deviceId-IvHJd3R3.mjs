import { S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { s as ChevronLeft } from "./_libs/lucide-react.mjs";
import { i as useNms, l as formatUptime, n as Route, s as deviceByHost } from "./_ssr/router-Cx8VRzWZ.mjs";
import { a as StatusPill, n as Panel, o as UtilBar, r as SeverityMark, t as Metric } from "./_ssr/bits-FvHip-Fx.mjs";
import { t as TrafficChart } from "./_ssr/traffic-chart-CqB5IIfN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_deviceId-IvHJd3R3.js
var import_jsx_runtime = require_jsx_runtime();
function DevicePage() {
	const { deviceId } = Route.useParams();
	const devices = useNms((state) => state.devices);
	const allIfaces = useNms((state) => state.ifaces);
	const allAlerts = useNms((state) => state.alerts);
	const samples = useNms((state) => state.samples);
	const device = devices.find((item) => item.id === deviceId);
	const ifaces = allIfaces.filter((row) => row.deviceId === deviceId);
	const alerts = allAlerts.filter((alert) => alert.deviceId === deviceId);
	if (!device) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-surface px-4 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "Device not in inventory"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "That hostname is not on the Bayline poller."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/devices",
				className: "mt-4 inline-flex min-h-11 items-center text-sm text-accent",
				children: "Back to devices"
			})
		]
	});
	const series = samples.map((sample) => ({
		label: sample.label,
		inMbps: Math.round(sample.inMbps * device.share),
		outMbps: Math.round(sample.outMbps * device.share)
	}));
	const facts = [
		["Management", device.ip],
		["Site", device.site],
		["Role", device.role],
		["Platform", `${device.vendor} ${device.model}`],
		["Software", device.os],
		["Serial", device.serial]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/devices",
				className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: "size-4",
					"aria-hidden": true
				}), "Devices"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-mono text-2xl font-semibold tracking-tight",
					children: device.hostname
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						device.vendor,
						" ",
						device.model
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: device.status })]
			}),
			device.status === "down" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-down/40 bg-down/10 px-4 py-3 text-sm text-down",
				children: "Unreachable. Polls are timing out and interface counters are frozen."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "CPU",
						value: device.status === "down" ? "—" : `${device.cpu}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Memory",
						value: device.status === "down" ? "—" : `${device.mem}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Uptime",
						value: formatUptime(device.uptimeSec)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Interfaces",
						value: String(ifaces.length),
						hint: `${ifaces.filter((row) => !row.operUp).length} down`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Traffic share of fabric",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficChart, {
					data: series,
					label: `Estimated traffic for ${device.hostname}`
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Identity",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-px bg-line sm:grid-cols-2",
					children: facts.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-xs uppercase tracking-widest text-faint",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-mono text-sm",
							children: value
						})]
					}, label))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Interfaces",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: ifaces.map((row) => {
					const neighbor = row.neighbor ? deviceByHost(devices, row.neighbor) : void 0;
					const peak = Math.max(row.utilIn, row.utilOut);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-line px-4 py-3 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-mono text-sm",
									children: row.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 truncate text-sm text-muted",
									children: [row.description, neighbor ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/devices/$deviceId",
										params: { deviceId: neighbor.id },
										className: "text-accent",
										children: neighbor.hostname
									})] }) : null]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right font-mono text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.speed }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: row.operUp ? "text-accent" : "text-down",
									children: row.operUp ? "up/up" : "down"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtilBar, { value: row.operUp ? peak : 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-muted",
								children: [
									row.operUp ? `${row.utilIn}/${row.utilOut}%` : "—",
									" · err ",
									row.errors
								]
							})]
						})]
					}, row.id);
				}) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Events on this device",
				children: alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-6 text-sm text-muted",
					children: "No events in this window."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: alerts.map((alert) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-line px-4 py-3 last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: alert.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-faint",
								children: alert.ago
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm font-medium",
							children: alert.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-pretty text-muted",
							children: alert.detail
						})
					]
				}, alert.id)) })
			})
		]
	});
}
//#endregion
export { DevicePage as component };
