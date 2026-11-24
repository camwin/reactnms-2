export type Health = "up" | "warn" | "down";
export type Severity = "critical" | "warning" | "info";

export type Device = {
  id: string;
  hostname: string;
  short: string;
  ip: string;
  site: string;
  role: string;
  vendor: string;
  model: string;
  os: string;
  status: Health;
  cpu: number;
  mem: number;
  uptimeSec: number;
  serial: string;
  share: number;
};

export type Iface = {
  id: string;
  deviceId: string;
  name: string;
  description: string;
  speed: string;
  utilIn: number;
  utilOut: number;
  errors: number;
  operUp: boolean;
  neighbor?: string;
};

export type FabricLink = {
  id: string;
  a: string;
  b: string;
  util: number;
};

export type Alert = {
  id: string;
  severity: Severity;
  deviceId: string;
  title: string;
  detail: string;
  ago: string;
  iface?: string;
};

export type Sample = {
  label: string;
  inMbps: number;
  outMbps: number;
};

export type Point = { x: number; y: number };

export const devices: Device[] = [
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
    uptimeSec: 86400 * 96 + 3600 * 4,
    serial: "JN0219AF0481",
    share: 0.34,
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
    uptimeSec: 86400 * 41 + 3600 * 11,
    serial: "FOX2418P1K2",
    share: 0.28,
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
    uptimeSec: 86400 * 18 + 3600 * 2,
    serial: "FCH2417V0AB",
    share: 0.12,
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
    uptimeSec: 86400 * 140 + 3600 * 6,
    serial: "FDO2341A9QX",
    share: 0.46,
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
    uptimeSec: 86400 * 140 + 3600 * 6,
    serial: "FDO2341A9R2",
    share: 0.41,
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
    uptimeSec: 86400 * 62,
    serial: "FCW2430L1AA",
    share: 0.16,
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
    uptimeSec: 86400 * 55 + 3600 * 9,
    serial: "FCW2430L1BQ",
    share: 0.19,
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
    uptimeSec: 86400 * 88,
    serial: "FCW2401L8CC",
    share: 0.31,
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
    uptimeSec: 86400 * 30,
    serial: "FOC2411X1NA",
    share: 0.07,
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
    share: 0.04,
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
    uptimeSec: 86400 * 27 + 3600 * 5,
    serial: "FOC2416X2SA",
    share: 0.08,
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
    uptimeSec: 86400 * 74,
    serial: "FDO2502P8DA",
    share: 0.22,
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
    uptimeSec: 86400 * 74,
    serial: "FDO2502P8DB",
    share: 0.2,
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
    uptimeSec: 86400 * 21,
    serial: "FCW2455W010",
    share: 0.09,
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
    uptimeSec: 86400 * 3 + 3600 * 6,
    serial: "FGL2440A014",
    share: 0.03,
  },
];

export const ifaces: Iface[] = [
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
  iface("ap-1", "aplib", "Gi0", "wlc-campus-01", "1G", 19, 8, 0, true, "wlc-campus-01"),
];

export const links: FabricLink[] = [
  { id: "l1", a: "er1", b: "cr1", util: 44 },
  { id: "l2", a: "er2", b: "cr2", util: 40 },
  { id: "l3", a: "er1", b: "er2", util: 12 },
  { id: "l4", a: "er1", b: "fw1", util: 18 },
  { id: "l5", a: "fw1", b: "cr1", util: 16 },
  { id: "l6", a: "cr1", b: "cr2", util: 22 },
  { id: "l7", a: "cr1", b: "dsn", util: 38 },
  { id: "l8", a: "cr2", b: "dsn", util: 31 },
  { id: "l9", a: "cr1", b: "dss", util: 55 },
  { id: "l10", a: "cr2", b: "dss", util: 48 },
  { id: "l11", a: "cr1", b: "dsdc", util: 62 },
  { id: "l12", a: "cr2", b: "dsdc", util: 58 },
  { id: "l13", a: "dsn", b: "asna", util: 24 },
  { id: "l14", a: "dsn", b: "asnb", util: 0 },
  { id: "l15", a: "dss", b: "assa", util: 33 },
  { id: "l16", a: "dsdc", b: "asdca", util: 71 },
  { id: "l17", a: "dsdc", b: "asdcb", util: 64 },
  { id: "l18", a: "asdca", b: "asdcb", util: 28 },
  { id: "l19", a: "dsn", b: "wlc", util: 14 },
  { id: "l20", a: "wlc", b: "aplib", util: 19 },
];

export const layout: Record<string, Point> = {
  er1: { x: 130, y: 64 },
  er2: { x: 470, y: 64 },
  fw1: { x: 820, y: 64 },
  cr1: { x: 280, y: 200 },
  cr2: { x: 700, y: 200 },
  dsn: { x: 130, y: 340 },
  dss: { x: 490, y: 340 },
  dsdc: { x: 840, y: 340 },
  asna: { x: 50, y: 480 },
  asnb: { x: 270, y: 480 },
  assa: { x: 490, y: 480 },
  asdca: { x: 710, y: 480 },
  asdcb: { x: 910, y: 480 },
  wlc: { x: 130, y: 620 },
  aplib: { x: 420, y: 620 },
};

export const alerts: Alert[] = [
  {
    id: "a1",
    severity: "critical",
    deviceId: "asnb",
    title: "Device unreachable",
    detail: "ICMP and SNMP timed out. Last adjacency was ds-north-01 Gi1/0/2.",
    ago: "4m",
    iface: "Gi1/0/49",
  },
  {
    id: "a2",
    severity: "critical",
    deviceId: "er2",
    title: "BGP session idle",
    detail: "Peer 100.64.1.8 Transit-B hold timer expired. Local pref path withdrawn.",
    ago: "11m",
  },
  {
    id: "a3",
    severity: "warning",
    deviceId: "fw1",
    title: "Data-plane CPU high",
    detail: "Snort inspect at 91% for 15 minutes. Policy hits concentrated on outside.",
    ago: "18m",
  },
  {
    id: "a4",
    severity: "warning",
    deviceId: "dss",
    title: "Optics receive low",
    detail: "Te1/1/2 Rx −18.4 dBm. Warning threshold is −17.0 dBm toward cr-core-02.",
    ago: "26m",
    iface: "Te1/1/2",
  },
  {
    id: "a5",
    severity: "warning",
    deviceId: "er1",
    title: "Input errors climbing",
    detail: "xe-0/0/0 CRC count +1.2k over the last hour on Transit-A.",
    ago: "41m",
    iface: "xe-0/0/0",
  },
  {
    id: "a6",
    severity: "warning",
    deviceId: "aplib",
    title: "Airtime high",
    detail: "5 GHz channel 44 at 78% utilization with 86 clients.",
    ago: "9m",
  },
  {
    id: "a7",
    severity: "info",
    deviceId: "cr1",
    title: "Checkpoint saved",
    detail: "Running-config archived as cr-core-01-20261123.",
    ago: "1h",
  },
  {
    id: "a8",
    severity: "info",
    deviceId: "wlc",
    title: "Access point joined",
    detail: "ap-library-014 rejoined after a DFS channel move.",
    ago: "2h",
  },
];

export const samples: Sample[] = [
  { label: "00", inMbps: 180, outMbps: 140 },
  { label: "02", inMbps: 120, outMbps: 90 },
  { label: "04", inMbps: 95, outMbps: 70 },
  { label: "06", inMbps: 210, outMbps: 160 },
  { label: "08", inMbps: 540, outMbps: 390 },
  { label: "10", inMbps: 810, outMbps: 620 },
  { label: "12", inMbps: 760, outMbps: 700 },
  { label: "14", inMbps: 880, outMbps: 640 },
  { label: "16", inMbps: 920, outMbps: 710 },
  { label: "18", inMbps: 690, outMbps: 540 },
  { label: "20", inMbps: 480, outMbps: 360 },
  { label: "22", inMbps: 310, outMbps: 220 },
];

function iface(
  id: string,
  deviceId: string,
  name: string,
  description: string,
  speed: string,
  utilIn: number,
  utilOut: number,
  errors: number,
  operUp: boolean,
  neighbor?: string,
): Iface {
  return { id, deviceId, name, description, speed, utilIn, utilOut, errors, operUp, neighbor };
}

export function deviceById(list: Device[], id: string) {
  return list.find((device) => device.id === id);
}

export function deviceByHost(list: Device[], hostname: string) {
  return list.find((device) => device.hostname === hostname);
}

export function formatUptime(sec: number) {
  if (sec <= 0) return "—";
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((sec % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export function peakUtil(rows: Iface[]) {
  if (rows.length === 0) return 0;
  return Math.max(...rows.map((row) => Math.max(row.utilIn, row.utilOut)));
}

export function countHealth(list: Device[]) {
  return {
    up: list.filter((device) => device.status === "up").length,
    warn: list.filter((device) => device.status === "warn").length,
    down: list.filter((device) => device.status === "down").length,
  };
}

const HEALTH_RANK: Record<Health, number> = { down: 0, warn: 1, up: 2 };

export function compareDevices(a: Device, b: Device) {
  const byHealth = HEALTH_RANK[a.status] - HEALTH_RANK[b.status];
  if (byHealth !== 0) return byHealth;
  return a.hostname.localeCompare(b.hostname);
}
