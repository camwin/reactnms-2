import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LayoutDashboard, c as Bell, n as TriangleAlert, r as Server, t as Waypoints } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cx8VRzWZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var devices = [
	{
		id: "er1",
		hostname: "er-edge-01",
		short: "EDGE-1",
		ip: "100.64.0.1",
		site: "Metro POP",
		role: "Edge",
		vendor: "Juniper",
		model: "MX204",
		os: "Junos 23.4R2",
		status: "up",
		cpu: 22,
		mem: 41,
		uptimeSec: 8308800,
		serial: "JN0219AF0481",
		share: .34
	},
	{
		id: "er2",
		hostname: "er-edge-02",
		short: "EDGE-2",
		ip: "100.64.0.2",
		site: "Metro POP",
		role: "Edge",
		vendor: "Cisco",
		model: "ASR 9901",
		os: "IOS-XR 7.11.2",
		status: "warn",
		cpu: 31,
		mem: 46,
		uptimeSec: 3582e3,
		serial: "FOX2418P1K2",
		share: .28
	},
	{
		id: "fw1",
		hostname: "fw-border-01",
		short: "FW-1",
		ip: "10.0.0.1",
		site: "Metro POP",
		role: "Firewall",
		vendor: "Cisco",
		model: "FTD 2130",
		os: "FTD 7.4.2",
		status: "warn",
		cpu: 91,
		mem: 74,
		uptimeSec: 1562400,
		serial: "FCH2417V0AB",
		share: .12
	},
	{
		id: "cr1",
		hostname: "cr-core-01",
		short: "CORE-1",
		ip: "10.0.0.11",
		site: "Campus Core",
		role: "Core",
		vendor: "Cisco",
		model: "Nexus 9504",
		os: "NX-OS 10.3(4a)",
		status: "up",
		cpu: 18,
		mem: 39,
		uptimeSec: 12117600,
		serial: "FDO2341A9QX",
		share: .46
	},
	{
		id: "cr2",
		hostname: "cr-core-02",
		short: "CORE-2",
		ip: "10.0.0.12",
		site: "Campus Core",
		role: "Core",
		vendor: "Cisco",
		model: "Nexus 9504",
		os: "NX-OS 10.3(4a)",
		status: "up",
		cpu: 16,
		mem: 37,
		uptimeSec: 12117600,
		serial: "FDO2341A9R2",
		share: .41
	},
	{
		id: "dsn",
		hostname: "ds-north-01",
		short: "DIST-N",
		ip: "10.1.0.1",
		site: "North Hall",
		role: "Distribution",
		vendor: "Cisco",
		model: "Catalyst 9500",
		os: "IOS-XE 17.12.4",
		status: "up",
		cpu: 14,
		mem: 44,
		uptimeSec: 5356800,
		serial: "FCW2430L1AA",
		share: .16
	},
	{
		id: "dss",
		hostname: "ds-south-01",
		short: "DIST-S",
		ip: "10.1.0.2",
		site: "South Hall",
		role: "Distribution",
		vendor: "Cisco",
		model: "Catalyst 9500",
		os: "IOS-XE 17.12.4",
		status: "warn",
		cpu: 27,
		mem: 49,
		uptimeSec: 4784400,
		serial: "FCW2430L1BQ",
		share: .19
	},
	{
		id: "dsdc",
		hostname: "ds-dc-01",
		short: "DIST-DC",
		ip: "10.2.0.1",
		site: "Data Center",
		role: "Distribution",
		vendor: "Cisco",
		model: "Catalyst 9500",
		os: "IOS-XE 17.12.4",
		status: "up",
		cpu: 24,
		mem: 52,
		uptimeSec: 7603200,
		serial: "FCW2401L8CC",
		share: .31
	},
	{
		id: "asna",
		hostname: "as-north-a",
		short: "ACC-NA",
		ip: "10.1.1.1",
		site: "North Hall",
		role: "Access",
		vendor: "Cisco",
		model: "Catalyst 9300",
		os: "IOS-XE 17.12.4",
		status: "up",
		cpu: 9,
		mem: 33,
		uptimeSec: 2592e3,
		serial: "FOC2411X1NA",
		share: .07
	},
	{
		id: "asnb",
		hostname: "as-north-b",
		short: "ACC-NB",
		ip: "10.1.1.2",
		site: "North Hall",
		role: "Access",
		vendor: "Cisco",
		model: "Catalyst 9300",
		os: "IOS-XE 17.12.4",
		status: "down",
		cpu: 0,
		mem: 0,
		uptimeSec: 0,
		serial: "FOC2411X1NB",
		share: .04
	},
	{
		id: "assa",
		hostname: "as-south-a",
		short: "ACC-S",
		ip: "10.1.2.1",
		site: "South Hall",
		role: "Access",
		vendor: "Cisco",
		model: "Catalyst 9300",
		os: "IOS-XE 17.12.4",
		status: "up",
		cpu: 11,
		mem: 36,
		uptimeSec: 2350800,
		serial: "FOC2416X2SA",
		share: .08
	},
	{
		id: "asdca",
		hostname: "as-dc-a",
		short: "DC-A",
		ip: "10.2.1.1",
		site: "Data Center",
		role: "Access",
		vendor: "Cisco",
		model: "Nexus 93180",
		os: "NX-OS 10.3(4a)",
		status: "up",
		cpu: 29,
		mem: 48,
		uptimeSec: 6393600,
		serial: "FDO2502P8DA",
		share: .22
	},
	{
		id: "asdcb",
		hostname: "as-dc-b",
		short: "DC-B",
		ip: "10.2.1.2",
		site: "Data Center",
		role: "Access",
		vendor: "Cisco",
		model: "Nexus 93180",
		os: "NX-OS 10.3(4a)",
		status: "up",
		cpu: 26,
		mem: 47,
		uptimeSec: 6393600,
		serial: "FDO2502P8DB",
		share: .2
	},
	{
		id: "wlc",
		hostname: "wlc-campus-01",
		short: "WLC",
		ip: "10.3.0.1",
		site: "Wireless",
		role: "Wireless",
		vendor: "Cisco",
		model: "C9800-40",
		os: "IOS-XE 17.12.3",
		status: "up",
		cpu: 21,
		mem: 58,
		uptimeSec: 1814400,
		serial: "FCW2455W010",
		share: .09
	},
	{
		id: "aplib",
		hostname: "ap-library-014",
		short: "AP-14",
		ip: "10.3.1.14",
		site: "Wireless",
		role: "Wireless",
		vendor: "Cisco",
		model: "C9130AXI",
		os: "17.12.3",
		status: "warn",
		cpu: 44,
		mem: 61,
		uptimeSec: 280800,
		serial: "FGL2440A014",
		share: .03
	}
];
var ifaces = [
	iface("er1-a", "er1", "xe-0/0/0", "Transit-A", "100G", 36, 28, 12, true),
	iface("er1-b", "er1", "xe-0/0/1", "cr-core-01", "100G", 44, 39, 0, true, "cr-core-01"),
	iface("er1-c", "er1", "xe-0/0/2", "fw-border-01", "10G", 18, 22, 0, true, "fw-border-01"),
	iface("er1-d", "er1", "ae1", "er-edge-02", "100G", 12, 11, 0, true, "er-edge-02"),
	iface("er2-a", "er2", "Hu0/0/0/0", "Transit-B", "100G", 8, 6, 0, true),
	iface("er2-b", "er2", "Hu0/0/0/1", "cr-core-02", "100G", 40, 33, 0, true, "cr-core-02"),
	iface("er2-c", "er2", "Hu0/0/0/2", "er-edge-01", "100G", 12, 11, 0, true, "er-edge-01"),
	iface("fw1-a", "fw1", "Port-channel1", "er-edge-01 outside", "10G", 18, 22, 0, true, "er-edge-01"),
	iface("fw1-b", "fw1", "Port-channel2", "cr-core-01 inside", "10G", 16, 19, 4, true, "cr-core-01"),
	iface("cr1-1", "cr1", "Eth1/1", "er-edge-01", "100G", 44, 39, 0, true, "er-edge-01"),
	iface("cr1-2", "cr1", "Eth1/2", "fw-border-01", "10G", 16, 19, 0, true, "fw-border-01"),
	iface("cr1-3", "cr1", "Eth1/3", "cr-core-02", "100G", 22, 20, 0, true, "cr-core-02"),
	iface("cr1-4", "cr1", "Eth1/4", "ds-north-01", "40G", 38, 29, 0, true, "ds-north-01"),
	iface("cr1-5", "cr1", "Eth1/5", "ds-south-01", "40G", 55, 41, 0, true, "ds-south-01"),
	iface("cr1-6", "cr1", "Eth1/6", "ds-dc-01", "100G", 62, 48, 0, true, "ds-dc-01"),
	iface("cr2-1", "cr2", "Eth1/1", "er-edge-02", "100G", 40, 33, 0, true, "er-edge-02"),
	iface("cr2-3", "cr2", "Eth1/3", "cr-core-01", "100G", 22, 20, 0, true, "cr-core-01"),
	iface("cr2-4", "cr2", "Eth1/4", "ds-north-01", "40G", 31, 24, 0, true, "ds-north-01"),
	iface("cr2-5", "cr2", "Eth1/5", "ds-south-01", "40G", 48, 36, 0, true, "ds-south-01"),
	iface("cr2-6", "cr2", "Eth1/6", "ds-dc-01", "100G", 58, 44, 0, true, "ds-dc-01"),
	iface("dsn-1", "dsn", "Te1/1/1", "cr-core-01", "40G", 38, 29, 0, true, "cr-core-01"),
	iface("dsn-2", "dsn", "Te1/1/2", "cr-core-02", "40G", 31, 24, 0, true, "cr-core-02"),
	iface("dsn-3", "dsn", "Gi1/0/1", "as-north-a", "10G", 24, 18, 0, true, "as-north-a"),
	iface("dsn-4", "dsn", "Gi1/0/2", "as-north-b", "10G", 0, 0, 0, false, "as-north-b"),
	iface("dsn-5", "dsn", "Gi1/0/24", "wlc-campus-01", "10G", 14, 11, 0, true, "wlc-campus-01"),
	iface("dss-1", "dss", "Te1/1/1", "cr-core-01", "40G", 55, 41, 2, true, "cr-core-01"),
	iface("dss-2", "dss", "Te1/1/2", "cr-core-02", "40G", 48, 36, 86, true, "cr-core-02"),
	iface("dss-3", "dss", "Gi1/0/1", "as-south-a", "10G", 33, 21, 0, true, "as-south-a"),
	iface("dsdc-1", "dsdc", "Hu1/0/1", "cr-core-01", "100G", 62, 48, 0, true, "cr-core-01"),
	iface("dsdc-2", "dsdc", "Hu1/0/2", "cr-core-02", "100G", 58, 44, 0, true, "cr-core-02"),
	iface("dsdc-3", "dsdc", "Eth1/1", "as-dc-a", "100G", 71, 66, 0, true, "as-dc-a"),
	iface("dsdc-4", "dsdc", "Eth1/2", "as-dc-b", "100G", 64, 59, 0, true, "as-dc-b"),
	iface("asna-1", "asna", "Gi1/0/49", "ds-north-01", "10G", 24, 18, 0, true, "ds-north-01"),
	iface("asna-2", "asna", "Gi1/0/1", "access vlan 20", "1G", 6, 2, 0, true),
	iface("asnb-1", "asnb", "Gi1/0/49", "ds-north-01", "10G", 0, 0, 0, false, "ds-north-01"),
	iface("asnb-2", "asnb", "Gi1/0/1", "access vlan 20", "1G", 0, 0, 0, false),
	iface("assa-1", "assa", "Gi1/0/49", "ds-south-01", "10G", 33, 21, 0, true, "ds-south-01"),
	iface("assa-2", "assa", "Gi1/0/12", "access vlan 30", "1G", 9, 4, 0, true),
	iface("asdca-1", "asdca", "Eth1/49", "ds-dc-01", "100G", 71, 66, 0, true, "ds-dc-01"),
	iface("asdca-2", "asdca", "Eth1/50", "as-dc-b peer", "100G", 28, 26, 0, true, "as-dc-b"),
	iface("asdca-3", "asdca", "Eth1/1", "esx-rack-a", "25G", 54, 48, 0, true),
	iface("asdcb-1", "asdcb", "Eth1/49", "ds-dc-01", "100G", 64, 59, 0, true, "ds-dc-01"),
	iface("asdcb-2", "asdcb", "Eth1/50", "as-dc-a peer", "100G", 28, 26, 0, true, "as-dc-a"),
	iface("asdcb-3", "asdcb", "Eth1/1", "esx-rack-b", "25G", 49, 41, 0, true),
	iface("wlc-1", "wlc", "Te0/0/0", "ds-north-01", "10G", 14, 11, 0, true, "ds-north-01"),
	iface("wlc-2", "wlc", "CAPWAP", "ap-library-014", "1G", 19, 8, 0, true, "ap-library-014"),
	iface("ap-1", "aplib", "Gi0", "wlc-campus-01", "1G", 19, 8, 0, true, "wlc-campus-01")
];
var links = [
	{
		id: "l1",
		a: "er1",
		b: "cr1",
		util: 44
	},
	{
		id: "l2",
		a: "er2",
		b: "cr2",
		util: 40
	},
	{
		id: "l3",
		a: "er1",
		b: "er2",
		util: 12
	},
	{
		id: "l4",
		a: "er1",
		b: "fw1",
		util: 18
	},
	{
		id: "l5",
		a: "fw1",
		b: "cr1",
		util: 16
	},
	{
		id: "l6",
		a: "cr1",
		b: "cr2",
		util: 22
	},
	{
		id: "l7",
		a: "cr1",
		b: "dsn",
		util: 38
	},
	{
		id: "l8",
		a: "cr2",
		b: "dsn",
		util: 31
	},
	{
		id: "l9",
		a: "cr1",
		b: "dss",
		util: 55
	},
	{
		id: "l10",
		a: "cr2",
		b: "dss",
		util: 48
	},
	{
		id: "l11",
		a: "cr1",
		b: "dsdc",
		util: 62
	},
	{
		id: "l12",
		a: "cr2",
		b: "dsdc",
		util: 58
	},
	{
		id: "l13",
		a: "dsn",
		b: "asna",
		util: 24
	},
	{
		id: "l14",
		a: "dsn",
		b: "asnb",
		util: 0
	},
	{
		id: "l15",
		a: "dss",
		b: "assa",
		util: 33
	},
	{
		id: "l16",
		a: "dsdc",
		b: "asdca",
		util: 71
	},
	{
		id: "l17",
		a: "dsdc",
		b: "asdcb",
		util: 64
	},
	{
		id: "l18",
		a: "asdca",
		b: "asdcb",
		util: 28
	},
	{
		id: "l19",
		a: "dsn",
		b: "wlc",
		util: 14
	},
	{
		id: "l20",
		a: "wlc",
		b: "aplib",
		util: 19
	}
];
var layout = {
	er1: {
		x: 130,
		y: 64
	},
	er2: {
		x: 470,
		y: 64
	},
	fw1: {
		x: 820,
		y: 64
	},
	cr1: {
		x: 280,
		y: 200
	},
	cr2: {
		x: 700,
		y: 200
	},
	dsn: {
		x: 130,
		y: 340
	},
	dss: {
		x: 490,
		y: 340
	},
	dsdc: {
		x: 840,
		y: 340
	},
	asna: {
		x: 50,
		y: 480
	},
	asnb: {
		x: 270,
		y: 480
	},
	assa: {
		x: 490,
		y: 480
	},
	asdca: {
		x: 710,
		y: 480
	},
	asdcb: {
		x: 910,
		y: 480
	},
	wlc: {
		x: 130,
		y: 620
	},
	aplib: {
		x: 420,
		y: 620
	}
};
var alerts = [
	{
		id: "a1",
		severity: "critical",
		deviceId: "asnb",
		title: "Device unreachable",
		detail: "ICMP and SNMP timed out. Last adjacency was ds-north-01 Gi1/0/2.",
		ago: "4m",
		iface: "Gi1/0/49"
	},
	{
		id: "a2",
		severity: "critical",
		deviceId: "er2",
		title: "BGP session idle",
		detail: "Peer 100.64.1.8 Transit-B hold timer expired. Local pref path withdrawn.",
		ago: "11m"
	},
	{
		id: "a3",
		severity: "warning",
		deviceId: "fw1",
		title: "Data-plane CPU high",
		detail: "Snort inspect at 91% for 15 minutes. Policy hits concentrated on outside.",
		ago: "18m"
	},
	{
		id: "a4",
		severity: "warning",
		deviceId: "dss",
		title: "Optics receive low",
		detail: "Te1/1/2 Rx −18.4 dBm. Warning threshold is −17.0 dBm toward cr-core-02.",
		ago: "26m",
		iface: "Te1/1/2"
	},
	{
		id: "a5",
		severity: "warning",
		deviceId: "er1",
		title: "Input errors climbing",
		detail: "xe-0/0/0 CRC count +1.2k over the last hour on Transit-A.",
		ago: "41m",
		iface: "xe-0/0/0"
	},
	{
		id: "a6",
		severity: "warning",
		deviceId: "aplib",
		title: "Airtime high",
		detail: "5 GHz channel 44 at 78% utilization with 86 clients.",
		ago: "9m"
	},
	{
		id: "a7",
		severity: "info",
		deviceId: "cr1",
		title: "Checkpoint saved",
		detail: "Running-config archived as cr-core-01-20261123.",
		ago: "1h"
	},
	{
		id: "a8",
		severity: "info",
		deviceId: "wlc",
		title: "Access point joined",
		detail: "ap-library-014 rejoined after a DFS channel move.",
		ago: "2h"
	}
];
var samples = [
	{
		label: "00",
		inMbps: 180,
		outMbps: 140
	},
	{
		label: "02",
		inMbps: 120,
		outMbps: 90
	},
	{
		label: "04",
		inMbps: 95,
		outMbps: 70
	},
	{
		label: "06",
		inMbps: 210,
		outMbps: 160
	},
	{
		label: "08",
		inMbps: 540,
		outMbps: 390
	},
	{
		label: "10",
		inMbps: 810,
		outMbps: 620
	},
	{
		label: "12",
		inMbps: 760,
		outMbps: 700
	},
	{
		label: "14",
		inMbps: 880,
		outMbps: 640
	},
	{
		label: "16",
		inMbps: 920,
		outMbps: 710
	},
	{
		label: "18",
		inMbps: 690,
		outMbps: 540
	},
	{
		label: "20",
		inMbps: 480,
		outMbps: 360
	},
	{
		label: "22",
		inMbps: 310,
		outMbps: 220
	}
];
function iface(id, deviceId, name, description, speed, utilIn, utilOut, errors, operUp, neighbor) {
	return {
		id,
		deviceId,
		name,
		description,
		speed,
		utilIn,
		utilOut,
		errors,
		operUp,
		neighbor
	};
}
function deviceById(list, id) {
	return list.find((device) => device.id === id);
}
function deviceByHost(list, hostname) {
	return list.find((device) => device.hostname === hostname);
}
function formatUptime(sec) {
	if (sec <= 0) return "—";
	const days = Math.floor(sec / 86400);
	const hours = Math.floor(sec % 86400 / 3600);
	if (days > 0) return `${days}d ${hours}h`;
	return `${hours}h ${Math.floor(sec % 3600 / 60)}m`;
}
function peakUtil(rows) {
	if (rows.length === 0) return 0;
	return Math.max(...rows.map((row) => Math.max(row.utilIn, row.utilOut)));
}
function countHealth(list) {
	return {
		up: list.filter((device) => device.status === "up").length,
		warn: list.filter((device) => device.status === "warn").length,
		down: list.filter((device) => device.status === "down").length
	};
}
var HEALTH_RANK = {
	down: 0,
	warn: 1,
	up: 2
};
function compareDevices(a, b) {
	const byHealth = HEALTH_RANK[a.status] - HEALTH_RANK[b.status];
	if (byHealth !== 0) return byHealth;
	return a.hostname.localeCompare(b.hostname);
}
function wobble(base, phase, salt, amp, cap) {
	const next = base + Math.sin(phase * .65 + salt) * amp;
	return Math.max(0, Math.min(cap, Math.round(next)));
}
var useNms = create((set) => ({
	devices,
	ifaces,
	links,
	alerts,
	samples,
	acked: {},
	polls: 0,
	tick: () => set((state) => {
		const phase = state.polls + 1;
		return {
			polls: phase,
			devices: devices.map((device, index) => {
				if (device.status === "down") return device;
				return {
					...device,
					cpu: wobble(device.cpu, phase, index, 2, 99),
					mem: wobble(device.mem, phase, index + 4, 1, 99)
				};
			}),
			ifaces: ifaces.map((row, index) => {
				if (!row.operUp) return row;
				return {
					...row,
					utilIn: wobble(row.utilIn, phase, index, 2, 99),
					utilOut: wobble(row.utilOut, phase, index + 2, 2, 99)
				};
			}),
			links: links.map((link, index) => ({
				...link,
				util: link.util === 0 ? 0 : wobble(link.util, phase, index + 1, 2, 99)
			})),
			samples: samples.map((sample, index) => ({
				...sample,
				inMbps: wobble(sample.inMbps, phase, index, Math.max(8, sample.inMbps * .03), 2e3),
				outMbps: wobble(sample.outMbps, phase, index + 3, Math.max(6, sample.outMbps * .03), 2e3)
			}))
		};
	}),
	toggleAck: (id) => set((state) => ({ acked: {
		...state.acked,
		[id]: !state.acked[id]
	} })),
	ackOpen: () => set((state) => {
		const next = { ...state.acked };
		for (const alert of state.alerts) if (alert.severity !== "info") next[alert.id] = true;
		return { acked: next };
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var NAV = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/devices",
		label: "Devices",
		icon: Server,
		exact: false
	},
	{
		to: "/topology",
		label: "Topology",
		icon: Waypoints,
		exact: true
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell,
		exact: true
	}
];
function isActive(path, to, exact) {
	const norm = path.length > 1 ? path.replace(/\/$/, "") : path;
	if (exact) return norm === to;
	return norm === to || norm.startsWith(`${to}/`);
}
function Shell({ children }) {
	const path = useRouterState({ select: (state) => state.location.pathname });
	const open = useNms((state) => state.alerts.filter((alert) => !state.acked[alert.id] && alert.severity !== "info").length);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => useNms.getState().tick(), 2500);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-14 items-center justify-between gap-3 px-4 lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: "ReactNMS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-mono text-xs text-faint",
								children: "Bayline Metro"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-mono text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "live-dot size-1.5 rounded-full bg-accent",
							"aria-hidden": true
						}), "Live"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "sticky top-14 hidden h-[calc(100dvh-3.5rem)] border-r border-line lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 p-3",
						"aria-label": "Primary",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							item,
							active: isActive(path, item.to, item.exact),
							open
						}, item.to))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl px-4 py-5 pb-28 lg:px-8 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur safe-bottom lg:hidden",
				"aria-label": "Primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-4",
					children: NAV.map((item) => {
						const active = isActive(path, item.to, item.exact);
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("relative flex min-h-14 flex-col items-center justify-center gap-1 text-xs", active ? "text-accent" : "text-faint"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: 1.75
								}),
								item.label,
								item.to === "/alerts" && open > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { count: open }) : null
							]
						}) }, item.to);
					})
				})
			})
		]
	});
}
function NavLink({ item, active, open }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm", active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4",
				strokeWidth: 1.75
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: item.label
			}),
			item.to === "/alerts" && open > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-down/15 px-2 py-0.5 font-mono text-xs tabular-nums text-down",
				children: open
			}) : null
		]
	});
}
function Badge({ count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-5 top-2 rounded-full bg-down px-1.5 font-mono text-xs leading-4 text-bg tabular-nums",
		children: count
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				className: "fill-raised"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "16",
				r: "2.4",
				className: "fill-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "8.5",
				r: "2.2",
				className: "fill-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "23",
				cy: "23.5",
				r: "2.2",
				className: "fill-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.2 16H20M11.4 15.2 20.2 9.6M11.5 16.8 21 22.2",
				className: "stroke-accent",
				strokeWidth: "1.6",
				fill: "none",
				strokeLinecap: "round"
			})
		]
	});
}
var styles_default = "/assets/styles-o8lo5uY5.css";
var APP_NAME = "ReactNMS";
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#080b10"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Schibsted+Grotesk:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$4 = () => import("./routes-AKxjIhEF.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./alerts-CRIUgVHx.mjs");
var Route$3 = createFileRoute("/alerts")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./topology-CUvk3GTy.mjs");
var Route$2 = createFileRoute("/topology")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./devices-D3AY-wnA.mjs");
var Route$1 = createFileRoute("/devices/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_deviceId-IvHJd3R3.mjs");
var Route = createFileRoute("/devices/$deviceId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var AlertsRoute = Route$3.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => Route$5
});
var TopologyRoute = Route$2.update({
	id: "/topology",
	path: "/topology",
	getParentRoute: () => Route$5
});
var DevicesIndexRoute = Route$1.update({
	id: "/devices/",
	path: "/devices/",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute,
	AlertsRoute,
	TopologyRoute,
	DevicesDeviceIdRoute: Route.update({
		id: "/devices/$deviceId",
		path: "/devices/$deviceId",
		getParentRoute: () => Route$5
	}),
	DevicesIndexRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { compareDevices as a, deviceById as c, peakUtil as d, useNms as i, formatUptime as l, Route as n, countHealth as o, cn as r, deviceByHost as s, router_exports as t, layout as u };
