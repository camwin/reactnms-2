import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { StatusPill, UtilBar } from "@/components/nms/bits";
import { cn } from "@/lib/cn";
import { compareDevices, formatUptime, peakUtil, type Health } from "@/lib/nms/model";
import { useNms } from "@/lib/nms/store";

export const Route = createFileRoute("/devices/")({ component: DevicesPage });

const FILTERS: Array<{ id: "all" | Health; label: string }> = [
  { id: "all", label: "All" },
  { id: "down", label: "Down" },
  { id: "warn", label: "Warning" },
  { id: "up", label: "Up" },
];

function DevicesPage() {
  const devices = useNms((state) => state.devices);
  const ifaces = useNms((state) => state.ifaces);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return devices
      .filter((device) => (filter === "all" ? true : device.status === filter))
      .filter((device) => {
        if (!needle) return true;
        return [device.hostname, device.ip, device.site, device.role, device.model, device.vendor]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      })
      .sort(compareDevices);
  }, [devices, filter, query]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
        <p className="mt-1 text-sm text-muted">
          {rows.length} shown · problems sort first
        </p>
      </div>

      <label className="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-3">
        <Search className="size-4 text-faint" aria-hidden />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Hostname, IP, site, role"
          className="h-11 w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-faint"
        />
      </label>

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
        <p className="rounded-xl border border-line bg-surface px-4 py-8 text-sm text-muted">
          Nothing matches that filter.
        </p>
      ) : (
        <ul className="overflow-hidden rounded-xl border border-line bg-surface">
          {rows.map((device) => {
            const peak = peakUtil(ifaces.filter((row) => row.deviceId === device.id && row.operUp));
            return (
              <li key={device.id} className="border-b border-line last:border-b-0">
                <Link
                  to="/devices/$deviceId"
                  params={{ deviceId: device.id }}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate font-mono text-sm">{device.hostname}</span>
                      <StatusPill status={device.status} />
                    </span>
                    <span className="mt-1 block truncate text-sm text-muted">
                      {device.ip} · {device.site} · {device.role}
                    </span>
                    <span className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <UtilBar value={device.status === "down" ? 0 : peak} />
                      <span className="font-mono text-xs tabular-nums text-muted">
                        CPU {device.status === "down" ? "—" : `${device.cpu}%`} · {formatUptime(device.uptimeSec)}
                      </span>
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-faint" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
