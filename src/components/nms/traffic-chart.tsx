import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Sample } from "@/lib/nms/model";

export function TrafficChart({ data, label }: { data: Sample[]; label: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) {
    return <div className="h-52" aria-hidden />;
  }

  return (
    <div className="h-52 w-full" role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-faint)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-faint)", fontSize: 11, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-line)" }}
            contentStyle={{
              background: "var(--color-raised)",
              border: "1px solid var(--color-line)",
              borderRadius: 12,
              color: "var(--color-fg)",
              fontSize: 12,
            }}
            formatter={(value, name) => [`${value} Mb/s`, name === "inMbps" ? "In" : "Out"]}
          />
          <Area
            type="monotone"
            dataKey="inMbps"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.16}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="outMbps"
            stroke="var(--color-warn)"
            fill="var(--color-warn)"
            fillOpacity={0.08}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
