import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, LayoutDashboard, Server, Waypoints } from "lucide-react";
import { useNms } from "@/lib/nms/store";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/devices", label: "Devices", icon: Server, exact: false },
  { to: "/topology", label: "Topology", icon: Waypoints, exact: true },
  { to: "/alerts", label: "Alerts", icon: Bell, exact: true },
] as const;

function isActive(path: string, to: string, exact: boolean) {
  const norm = path.length > 1 ? path.replace(/\/$/, "") : path;
  if (exact) return norm === to;
  return norm === to || norm.startsWith(`${to}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const open = useNms(
    (state) => state.alerts.filter((alert) => !state.acked[alert.id] && alert.severity !== "info").length,
  );

  useEffect(() => {
    const id = window.setInterval(() => useNms.getState().tick(), 2500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-3 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Mark />
            <div className="leading-none">
              <div className="text-sm font-semibold">ReactNMS</div>
              <div className="mt-1 font-mono text-xs text-faint">Bayline Metro</div>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="live-dot size-1.5 rounded-full bg-accent" aria-hidden />
            Live
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] border-r border-line lg:block">
          <nav className="flex flex-col gap-1 p-3" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} item={item} active={isActive(path, item.to, item.exact)} open={open} />
            ))}
          </nav>
        </aside>
        <main className="mx-auto w-full max-w-6xl px-4 py-5 pb-28 lg:px-8 lg:pb-10">{children}</main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur safe-bottom lg:hidden"
        aria-label="Primary"
      >
        <ul className="grid grid-cols-4">
          {NAV.map((item) => {
            const active = isActive(path, item.to, item.exact);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "relative flex min-h-14 flex-col items-center justify-center gap-1 text-xs",
                    active ? "text-accent" : "text-faint",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                  {item.label}
                  {item.to === "/alerts" && open > 0 ? <Badge count={open} /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function NavLink({
  item,
  active,
  open,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  open: number;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm",
        active ? "bg-raised text-fg" : "text-muted hover:bg-raised hover:text-fg",
      )}
    >
      <Icon className="size-4" strokeWidth={1.75} />
      <span className="flex-1">{item.label}</span>
      {item.to === "/alerts" && open > 0 ? (
        <span className="rounded-full bg-down/15 px-2 py-0.5 font-mono text-xs tabular-nums text-down">{open}</span>
      ) : null}
    </Link>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute right-5 top-2 rounded-full bg-down px-1.5 font-mono text-xs leading-4 text-bg tabular-nums">
      {count}
    </span>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-raised" />
      <circle cx="9" cy="16" r="2.4" className="fill-accent" />
      <circle cx="22" cy="8.5" r="2.2" className="fill-fg" />
      <circle cx="23" cy="23.5" r="2.2" className="fill-fg" />
      <path
        d="M11.2 16H20M11.4 15.2 20.2 9.6M11.5 16.8 21 22.2"
        className="stroke-accent"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
