import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { StatusPill } from "@/components/nms/bits";
import { deviceById, layout, type Health } from "@/lib/nms/model";
import { useNms } from "@/lib/nms/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/topology")({ component: TopologyPage });

const stroke: Record<Health, string> = {
  up: "stroke-accent",
  warn: "stroke-warn",
  down: "stroke-down",
};

const fill: Record<Health, string> = {
  up: "fill-accent",
  warn: "fill-warn",
  down: "fill-down",
};

function TopologyPage() {
  const devices = useNms((state) => state.devices);
  const links = useNms((state) => state.links);
  const [selected, setSelected] = useState<string | null>("asnb");
  const current = selected ? deviceById(devices, selected) : undefined;
  const attached = current
    ? links.filter((link) => link.a === current.id || link.b === current.id)
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Topology</h1>
        <p className="mt-1 text-sm text-muted">Logical fabric. Swipe the map on a phone, then pick a node.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="overflow-x-auto">
          <svg viewBox="0 0 1080 700" className="h-auto w-[720px] max-w-none sm:w-full" role="img" aria-label="Bayline Metro logical topology">
            {links.map((link) => {
              const a = layout[link.a];
              const b = layout[link.b];
              const left = deviceById(devices, link.a);
              const right = deviceById(devices, link.b);
              if (!a || !b || !left || !right) return null;
              const dead = left.status === "down" || right.status === "down" || link.util === 0;
              const hot = link.util >= 65;
              return (
                <line
                  key={link.id}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={dead ? "stroke-down" : hot ? "stroke-warn" : "stroke-line"}
                  strokeWidth={dead ? 2 : 2 + link.util / 40}
                />
              );
            })}
            {devices.map((device) => {
              const point = layout[device.id];
              if (!point) return null;
              const on = selected === device.id;
              return (
                <g
                  key={device.id}
                  role="button"
                  tabIndex={0}
                  aria-label={device.hostname}
                  aria-pressed={on}
                  className="cursor-pointer"
                  onClick={() => setSelected(device.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(device.id);
                    }
                  }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={on ? 28 : 22}
                    className={cn("fill-raised", stroke[device.status])}
                    strokeWidth={on ? 4 : 2.5}
                  />
                  <circle cx={point.x} cy={point.y} r={5} className={fill[device.status]} />
                  <rect
                    x={point.x + 22}
                    y={point.y - 13}
                    width={device.short.length * 9 + 12}
                    height={24}
                    rx={5}
                    className="fill-raised"
                  />
                  <text
                    x={point.x + 28}
                    y={point.y + 4}
                    className="fill-fg font-mono"
                    fontSize="14"
                  >
                    {device.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="flex flex-wrap gap-4 border-t border-line px-4 py-3 font-mono text-xs text-muted">
          <span className="text-accent">Up</span>
          <span className="text-warn">Warning or hot link</span>
          <span className="text-down">Down</span>
        </div>
      </div>

      <section className="rounded-xl border border-line bg-surface px-4 py-4">
        {current ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-mono text-lg font-semibold">{current.hostname}</h2>
                <p className="mt-1 text-sm text-muted">
                  {current.role} · {current.site} · {current.model}
                </p>
              </div>
              <StatusPill status={current.status} />
            </div>
            <p className="font-mono text-sm tabular-nums text-muted">
              {current.ip} · CPU {current.status === "down" ? "—" : `${current.cpu}%`} · mem{" "}
              {current.status === "down" ? "—" : `${current.mem}%`}
            </p>
            <ul className="flex flex-col gap-1 text-sm text-muted">
              {attached.map((link) => {
                const otherId = link.a === current.id ? link.b : link.a;
                const other = deviceById(devices, otherId);
                return (
                  <li key={link.id}>
                    <button type="button" className="min-h-11 text-left" onClick={() => setSelected(otherId)}>
                      <span className="font-mono text-fg">{other?.short}</span>
                      <span className="text-muted"> · {link.util === 0 ? "down" : `${link.util}%`}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <Link to="/devices/$deviceId" params={{ deviceId: current.id }} className="inline-flex min-h-11 items-center text-sm text-accent">
              Open device
            </Link>
          </div>
        ) : (
          <p className="text-sm text-muted">Select a node to see adjacencies.</p>
        )}
      </section>
    </div>
  );
}
