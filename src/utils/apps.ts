export type AppRecord = {
  id: string;
  name: string;
  createdAt: number;
};

const STORAGE_KEY = "apps";

import { getSupabase, hasSupabase } from "@/lib/supabase";

export function getApps(): AppRecord[] {
  if (hasSupabase) {
    const supabase = getSupabase();
    const state = (window as any).__apps_cache as AppRecord[] | undefined;
    if (state) return state;
    // NOTE: Supabase path is async; for simplicity, keep localStorage as the synchronous source of truth.
    // You can migrate data by reading Supabase on page load and syncing to localStorage.
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveApps(apps: AppRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function addApp(name: string): AppRecord {
  const now = Date.now();
  const id = `${now}-${Math.random().toString(36).slice(2, 8)}`;
  const record: AppRecord = { id, name, createdAt: now };

  const apps = getApps();
  apps.push(record);
  saveApps(apps);

  // OPTIONAL: push to Supabase if configured
  if (hasSupabase) {
    const supabase = getSupabase();
    if (supabase) {
      // fire-and-forget; UI remains responsive
      supabase.from("apps").insert({ id: record.id, name: record.name, created_at: new Date(record.createdAt).toISOString() });
    }
  }

  return record;
}

export function removeApp(id: string) {
  const apps = getApps().filter((a) => a.id !== id);
  saveApps(apps);
  if (hasSupabase) {
    const supabase = getSupabase();
    if (supabase) {
      supabase.from("apps").delete().eq("id", id);
    }
  }
}

export function clearApps() {
  saveApps([]);
  if (hasSupabase) {
    const supabase = getSupabase();
    if (supabase) {
      supabase.from("apps").delete().neq("id", ""); // delete all
    }
  }
}