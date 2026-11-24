import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Metric, Panel, SeverityMark, StatusPill, UtilBar } from "@/components/nms/bits";
import { TrafficChart } from "@/components/nms/traffic-chart";
import { deviceByHost, formatUptime, type Sample } from "@/lib/nms/model";
import { useNms } from "@/lib/nms/store";

export const Route = createFileRoute("/devices/$deviceId")({ component: DevicePage });

function DevicePage() {
  const { deviceId } = Route.useParams();
  const devices = useNms((state) => state.devices);
  const allIfaces = useNms((state) => state.ifaces);
  const allAlerts = useNms((state) => state.alerts);
  const samples = useNms((state) => state.samples);
  const device = devices.find((item) => item.id === deviceId);
  const ifaces = allIfaces.filter((row) => row.deviceId === deviceId);
  const alerts = allAlerts.filter((alert) => alert.deviceId === deviceId);

  if (!device) {
    return (
      <div className="rounded-xl border border-line bg-surface px-4 py-10 text-center">
        <h1 className="text-xl font-semibold">Device not in inventory</h1>
        <p className="mt-2 text-sm text-muted">That hostname is not on the Bayline poller.</p>
        <Link to="/devices" className="mt-4 inline-flex min-h-11 items-center text-sm text-accent">
          Back to devices
        </Link>
      </div>
    );
  }

  const series: Sample[] = samples.map((sample) => ({
    label: sample.label,
    inMbps: Math.round(sample.inMbps * device.share),
    outMbps: Math.round(sample.outMbps * device.share),
  }));

  const facts = [
    ["Management", device.ip],
    ["Site", device.site],
    ["Role", device.role],
    ["Platform", `${device.vendor} ${device.model}`],
    ["Software", device.os],
    ["Serial", device.serial],
  ];

  return (
    <div className="flex flex-col gap-4">
      <Link to="/devices" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" aria-hidden />
        Devices
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-mono text-2xl font-semibold tracking-tight">{device.hostname}</h1>
          <p className="mt-1 text-sm text-muted">
            {device.vendor} {device.model}
          </p>
        </div>
        <StatusPill status={device.status} />
      </div>

      {device.status === "down" ? (
        <p className="rounded-xl border border-down/40 bg-down/10 px-4 py-3 text-sm text-down">
          Unreachable. Polls are timing out and interface counters are frozen.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="CPU" value={device.status === "down" ? "—" : `${device.cpu}%`} />
        <Metric label="Memory" value={device.status === "down" ? "—" : `${device.mem}%`} />
        <Metric label="Uptime" value={formatUptime(device.uptimeSec)} />
        <Metric label="Interfaces" value={String(ifaces.length)} hint={`${ifaces.filter((row) => !row.operUp).length} down`} />
      </div>

      <Panel title="Traffic share of fabric">
        <TrafficChart data={series} label={`Estimated traffic for ${device.hostname}`} />
      </Panel>

      <Panel title="Identity">
        <dl className="grid gap-px bg-line sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-surface px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-widest text-faint">{label}</dt>
              <dd className="mt-1 font-mono text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel title="Interfaces">
        <ul>
          {ifaces.map((row) => {
            const neighbor = row.neighbor ? deviceByHost(devices, row.neighbor) : undefined;
            const peak = Math.max(row.utilIn, row.utilOut);
            return (
              <li key={row.id} className="border-b border-line px-4 py-3 last:border-b-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm">{row.name}</div>
                    <div className="mt-1 truncate text-sm text-muted">
                      {row.description}
                      {neighbor ? (
                        <>
                          {" · "}
                          <Link to="/devices/$deviceId" params={{ deviceId: neighbor.id }} className="text-accent">
                            {neighbor.hostname}
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-muted">
                    <div>{row.speed}</div>
                    <div className={row.operUp ? "text-accent" : "text-down"}>{row.operUp ? "up/up" : "down"}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <UtilBar value={row.operUp ? peak : 0} />
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {row.operUp ? `${row.utilIn}/${row.utilOut}%` : "—"} · err {row.errors}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel title="Events on this device">
        {alerts.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">No events in this window.</p>
        ) : (
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="border-b border-line px-4 py-3 last:border-b-0">
                <div className="flex items-center justify-between gap-3">
                  <SeverityMark severity={alert.severity} />
                  <span className="font-mono text-xs text-faint">{alert.ago}</span>
                </div>
                <div className="mt-1 text-sm font-medium">{alert.title}</div>
                <p className="mt-1 text-sm text-pretty text-muted">{alert.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
