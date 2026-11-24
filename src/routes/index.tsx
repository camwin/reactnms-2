import { createFileRoute, Link } from "@tanstack/react-router";
import { Metric, Panel, SeverityMark, StatusDot, UtilBar } from "@/components/nms/bits";
import { TrafficChart } from "@/components/nms/traffic-chart";
import { countHealth, deviceById, peakUtil } from "@/lib/nms/model";
import { useNms } from "@/lib/nms/store";

export const Route = createFileRoute("/")({ component: Overview });

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
  const hottest = [...ifaces]
    .filter((row) => row.operUp)
    .sort((a, b) => Math.max(b.utilIn, b.utilOut) - Math.max(a.utilIn, a.utilOut))
    .slice(0, 5);
  const latest = samples[samples.length - 1];

  const sites = Array.from(new Set(devices.map((device) => device.site)));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Fabric overview</h1>
        <p className="mt-1 text-sm text-pretty text-muted">
          {critical} critical and {warning} warning across {devices.length} polled devices. Simulated SNMP, not a live
          network.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Up" value={String(health.up)} hint={`${health.warn} warning · ${health.down} down`} />
        <Metric label="Open alerts" value={String(open.length)} hint={`${critical} critical`} />
        <Metric label="Ingress" value={latest ? String(latest.inMbps) : "—"} hint="Mb/s, last sample" />
        <Metric label="Sites" value={String(sites.length)} hint="POP through wireless" />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel
          className="lg:col-span-3"
          title="Aggregate traffic"
          action={
            <span className="flex items-center gap-3 font-mono text-xs text-faint">
              <span className="text-accent">In</span>
              <span className="text-warn">Out</span>
            </span>
          }
        >
          <TrafficChart data={samples} label="Aggregate ingress and egress over the day, megabits per second" />
        </Panel>

        <Panel
          className="lg:col-span-2"
          title="Open alerts"
          action={
            <Link to="/alerts" className="text-sm text-accent">
              All
            </Link>
          }
        >
          <ul>
            {open.slice(0, 5).map((alert) => {
              const device = deviceById(devices, alert.deviceId);
              return (
                <li key={alert.id} className="border-b border-line px-4 py-3 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <SeverityMark severity={alert.severity} />
                    <span className="font-mono text-xs text-faint">{alert.ago}</span>
                  </div>
                  <Link
                    to="/devices/$deviceId"
                    params={{ deviceId: alert.deviceId }}
                    className="mt-1 block text-sm font-medium"
                  >
                    {alert.title}
                  </Link>
                  <div className="mt-1 font-mono text-xs text-muted">{device?.hostname}</div>
                </li>
              );
            })}
            {open.length === 0 ? <li className="px-4 py-6 text-sm text-muted">Queue is clear.</li> : null}
          </ul>
        </Panel>
      </div>

      <Panel title="Hottest interfaces">
        <ul>
          {hottest.map((row) => {
            const device = deviceById(devices, row.deviceId);
            const peak = Math.max(row.utilIn, row.utilOut);
            return (
              <li key={row.id} className="border-b border-line last:border-b-0">
                <Link
                  to="/devices/$deviceId"
                  params={{ deviceId: row.deviceId }}
                  className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_8rem_4.5rem]"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-sm">{row.name}</span>
                    <span className="block truncate text-xs text-muted">{device?.hostname}</span>
                  </span>
                  <span className="hidden truncate text-sm text-muted sm:block">{row.description}</span>
                  <span className="hidden sm:block">
                    <UtilBar value={peak} />
                  </span>
                  <span className="text-right font-mono text-sm tabular-nums">{peak}%</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel title="Sites">
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => {
            const members = devices.filter((device) => device.site === site);
            const siteHealth = countHealth(members);
            const tone = siteHealth.down > 0 ? "down" : siteHealth.warn > 0 ? "warn" : "up";
            return (
              <li key={site} className="flex items-center justify-between gap-3 bg-surface px-4 py-3">
                <span className="flex items-center gap-2 text-sm">
                  <StatusDot status={tone} />
                  {site}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted">
                  {siteHealth.up}/{members.length} up · {peakUtil(ifaces.filter((row) => members.some((device) => device.id === row.deviceId)))}%
                </span>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
