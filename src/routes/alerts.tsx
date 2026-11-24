import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SeverityMark } from "@/components/nms/bits";
import { cn } from "@/lib/cn";
import { deviceById, type Severity } from "@/lib/nms/model";
import { useNms } from "@/lib/nms/store";

export const Route = createFileRoute("/alerts")({ component: AlertsPage });

const FILTERS: Array<{ id: "open" | "all" | Severity; label: string }> = [
  { id: "open", label: "Open" },
  { id: "critical", label: "Critical" },
  { id: "warning", label: "Warning" },
  { id: "info", label: "Info" },
  { id: "all", label: "All" },
];

function AlertsPage() {
  const alerts = useNms((state) => state.alerts);
  const devices = useNms((state) => state.devices);
  const acked = useNms((state) => state.acked);
  const toggleAck = useNms((state) => state.toggleAck);
  const ackOpen = useNms((state) => state.ackOpen);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("open");

  const rows = alerts.filter((alert) => {
    if (filter === "open") return !acked[alert.id] && alert.severity !== "info";
    if (filter === "all") return true;
    return alert.severity === filter;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Alerts</h1>
          <p className="mt-1 text-sm text-muted">Acknowledge stays in this session.</p>
        </div>
        <Button tone="line" onClick={ackOpen}>
          Ack open
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm",
              filter === item.id ? "border-accent bg-accent/10 text-accent" : "border-line bg-surface text-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface px-4 py-8 text-sm text-muted">Nothing in this view.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((alert) => {
            const device = deviceById(devices, alert.deviceId);
            const done = Boolean(acked[alert.id]);
            return (
              <li key={alert.id} className="rounded-xl border border-line bg-surface px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <SeverityMark severity={alert.severity} />
                  <span className="font-mono text-xs text-faint">{alert.ago}</span>
                </div>
                <h2 className="mt-2 text-base font-semibold">{alert.title}</h2>
                <p className="mt-1 text-sm text-pretty text-muted">{alert.detail}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  {device ? (
                    <Link to="/devices/$deviceId" params={{ deviceId: device.id }} className="font-mono text-sm text-accent">
                      {device.hostname}
                      {alert.iface ? ` · ${alert.iface}` : ""}
                    </Link>
                  ) : (
                    <span />
                  )}
                  <Button tone={done ? "ghost" : "line"} onClick={() => toggleAck(alert.id)} aria-pressed={done}>
                    {done ? "Acknowledged" : "Acknowledge"}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
