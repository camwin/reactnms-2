import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Health, Severity } from "@/lib/nms/model";
import { cn } from "@/lib/cn";

const healthText: Record<Health, string> = {
  up: "text-accent",
  warn: "text-warn",
  down: "text-down",
};

const healthBg: Record<Health, string> = {
  up: "bg-accent",
  warn: "bg-warn",
  down: "bg-down",
};

const healthLabel: Record<Health, string> = {
  up: "Up",
  warn: "Warning",
  down: "Down",
};

export function StatusDot({ status, pulse = false }: { status: Health; pulse?: boolean }) {
  return (
    <span
      className={cn("inline-block size-2 shrink-0 rounded-full", healthBg[status], pulse && status !== "down" && "live-dot")}
      aria-hidden
    />
  );
}

export function StatusPill({ status }: { status: Health }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", healthText[status])}>
      <StatusDot status={status} />
      {healthLabel[status]}
    </span>
  );
}

const severityText: Record<Severity, string> = {
  critical: "text-down",
  warning: "text-warn",
  info: "text-muted",
};

export function SeverityMark({ severity }: { severity: Severity }) {
  const label = severity === "critical" ? "Critical" : severity === "warning" ? "Warning" : "Info";
  return <span className={cn("font-mono text-xs uppercase tracking-widest", severityText[severity])}>{label}</span>;
}

export function UtilBar({ value }: { value: number }) {
  const tone = value >= 80 ? "bg-down" : value >= 65 ? "bg-warn" : "bg-accent";
  return (
    <span className="block h-1.5 w-full overflow-hidden rounded-full bg-line">
      <span className={cn("block h-full rounded-full", tone)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </span>
  );
}

export function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-4 py-3">
      <div className="font-mono text-xs uppercase tracking-widest text-faint">{label}</div>
      <div className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-sm text-muted">{hint}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-surface", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-faint">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

export function DeviceLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <Link to="/devices/$deviceId" params={{ deviceId: id }} className={className}>
      {children}
    </Link>
  );
}
