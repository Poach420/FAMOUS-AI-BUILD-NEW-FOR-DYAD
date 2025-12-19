export type AppRecord = {
  id: string;
  name: string;
  createdAt: number;
};

const STORAGE_KEY = "apps";

export function getApps(): AppRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveApps(apps: AppRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function addApp(name: string): AppRecord {
  const apps = getApps();
  const now = Date.now();
  const id = `${now}-${Math.random().toString(36).slice(2, 8)}`;
  const record: AppRecord = { id, name, createdAt: now };
  apps.push(record);
  saveApps(apps);
  return record;
}

export function removeApp(id: string) {
  const apps = getApps().filter((a) => a.id !== id);
  saveApps(apps);
}

export function clearApps() {
  saveApps([]);
}