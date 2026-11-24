import { create } from "zustand";
import {
  alerts as seedAlerts,
  devices as seedDevices,
  ifaces as seedIfaces,
  links as seedLinks,
  samples as seedSamples,
  type Alert,
  type Device,
  type FabricLink,
  type Iface,
  type Sample,
} from "./model";

type NmsState = {
  devices: Device[];
  ifaces: Iface[];
  links: FabricLink[];
  alerts: Alert[];
  samples: Sample[];
  acked: Record<string, boolean>;
  polls: number;
  tick: () => void;
  toggleAck: (id: string) => void;
  ackOpen: () => void;
};

function wobble(base: number, phase: number, salt: number, amp: number, cap: number) {
  const next = base + Math.sin(phase * 0.65 + salt) * amp;
  return Math.max(0, Math.min(cap, Math.round(next)));
}

export const useNms = create<NmsState>((set) => ({
  devices: seedDevices,
  ifaces: seedIfaces,
  links: seedLinks,
  alerts: seedAlerts,
  samples: seedSamples,
  acked: {},
  polls: 0,
  tick: () =>
    set((state) => {
      const phase = state.polls + 1;
      return {
        polls: phase,
        devices: seedDevices.map((device, index) => {
          if (device.status === "down") return device;
          return {
            ...device,
            cpu: wobble(device.cpu, phase, index, 2, 99),
            mem: wobble(device.mem, phase, index + 4, 1, 99),
          };
        }),
        ifaces: seedIfaces.map((row, index) => {
          if (!row.operUp) return row;
          return {
            ...row,
            utilIn: wobble(row.utilIn, phase, index, 2, 99),
            utilOut: wobble(row.utilOut, phase, index + 2, 2, 99),
          };
        }),
        links: seedLinks.map((link, index) => ({
          ...link,
          util: link.util === 0 ? 0 : wobble(link.util, phase, index + 1, 2, 99),
        })),
        samples: seedSamples.map((sample, index) => ({
          ...sample,
          inMbps: wobble(sample.inMbps, phase, index, Math.max(8, sample.inMbps * 0.03), 2000),
          outMbps: wobble(sample.outMbps, phase, index + 3, Math.max(6, sample.outMbps * 0.03), 2000),
        })),
      };
    }),
  toggleAck: (id) =>
    set((state) => ({
      acked: { ...state.acked, [id]: !state.acked[id] },
    })),
  ackOpen: () =>
    set((state) => {
      const next = { ...state.acked };
      for (const alert of state.alerts) {
        if (alert.severity !== "info") next[alert.id] = true;
      }
      return { acked: next };
    }),
}));
