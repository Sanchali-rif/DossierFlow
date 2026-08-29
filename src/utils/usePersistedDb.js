import { useState, useEffect, useRef } from "react";
import { seedData } from "../constants/seedData";

const STORAGE_KEY = "dossierflow_db";

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data — fall through to seed
  }
  return seedData();
}

function saveDb(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch {
    // storage full or unavailable — silently skip
  }
}

/**
 * Behaves exactly like useState(seedData()) but syncs every update
 * to localStorage so the workspace survives page refreshes.
 */
export function usePersistedDb() {
  const [db, setDbRaw] = useState(() => loadDb());
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return; // skip the initial render to avoid a redundant write
    }
    saveDb(db);
  }, [db]);

  return [db, setDbRaw];
}
