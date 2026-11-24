/**
 * Web build `Database` (test environment for the Google review): SQLite
 * compiled to WebAssembly (sql.js, wasm inlined in the bundle) in memory, saved to IndexedDB after writes so
 * a reload keeps the mailbox. No FTS5 in this build: search uses LIKE.
 */

import type { Database, SqlParams, SqlRunResult, SqlValue } from '@/data/db/database';

interface SqlJsStatement {
  bind(values: unknown): void;
  step(): boolean;
  getAsObject(): Record<string, unknown>;
  free(): void;
}

interface SqlJsDatabase {
  exec(sql: string): { values: unknown[][] }[];
  prepare(sql: string): SqlJsStatement;
  getRowsModified(): number;
  export(): Uint8Array;
}

type SqlJs = { Database: new (data?: Uint8Array) => SqlJsDatabase };

// eslint-disable-next-line @typescript-eslint/no-require-imports
const initSqlJs = require('sql.js/dist/sql-wasm-inline.js') as () => Promise<SqlJs>;

const IDB_NAME = 'wouah-mail-web';
const IDB_STORE = 'databases';
const SAVE_DELAY_MS = 800;

function openIdb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') return resolve(null);
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(IDB_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

function idbGet(idb: IDBDatabase, key: string): Promise<Uint8Array | null> {
  return new Promise((resolve) => {
    const request = idb.transaction(IDB_STORE, 'readonly').objectStore(IDB_STORE).get(key);
    request.onsuccess = () => resolve((request.result as Uint8Array | undefined) ?? null);
    request.onerror = () => resolve(null);
  });
}

function idbPut(idb: IDBDatabase, key: string, value: Uint8Array): Promise<void> {
  return new Promise((resolve) => {
    const transaction = idb.transaction(IDB_STORE, 'readwrite');
    transaction.objectStore(IDB_STORE).put(value, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => resolve();
  });
}

/** sql.js wants `$name` keys and no booleans / undefined. */
function normalize(params?: SqlParams): unknown {
  if (params === undefined) return undefined;
  const value = (v: SqlValue | boolean | undefined) =>
    v === undefined ? null : typeof v === 'boolean' ? Number(v) : v;
  if (Array.isArray(params)) return params.map(value);
  const named: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(params)) {
    named[/^[:$@]/.test(key) ? key : `$${key}`] = value(v);
  }
  return named;
}

class SqlJsAppDatabase implements Database {
  readonly supportsFullText = false;
  private saveTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly db: SqlJsDatabase,
    private readonly idb: IDBDatabase | null,
    private readonly key: string,
  ) {
    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', () => void this.saveNow());
    }
  }

  private scheduleSave(): void {
    if (!this.idb) return;
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => void this.saveNow(), SAVE_DELAY_MS);
  }

  private async saveNow(): Promise<void> {
    if (!this.idb) return;
    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = null;
    await idbPut(this.idb, this.key, this.db.export());
  }

  private all<T>(source: string, params?: SqlParams): T[] {
    const statement = this.db.prepare(source);
    try {
      const bound = normalize(params);
      if (bound !== undefined) statement.bind(bound);
      const rows: T[] = [];
      while (statement.step()) rows.push(statement.getAsObject() as T);
      return rows;
    } finally {
      statement.free();
    }
  }

  async execAsync(source: string): Promise<void> {
    this.db.exec(source);
    this.scheduleSave();
  }

  async runAsync(source: string, params?: SqlParams): Promise<SqlRunResult> {
    const statement = this.db.prepare(source);
    try {
      const bound = normalize(params);
      if (bound !== undefined) statement.bind(bound);
      statement.step();
    } finally {
      statement.free();
    }
    const changes = this.db.getRowsModified();
    const id = this.db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] ?? 0;
    this.scheduleSave();
    return { lastInsertRowId: Number(id), changes };
  }

  async getFirstAsync<T>(source: string, params?: SqlParams): Promise<T | null> {
    return this.all<T>(source, params)[0] ?? null;
  }

  async getAllAsync<T>(source: string, params?: SqlParams): Promise<T[]> {
    return this.all<T>(source, params);
  }
}

/** Open the browser database, restoring the last saved copy when there is one. */
export async function openAppDatabase(name = 'mailyo.db'): Promise<Database> {
  const SQL = await initSqlJs();
  const idb = await openIdb();
  const saved = idb ? await idbGet(idb, name) : null;
  const db = saved ? new SQL.Database(saved) : new SQL.Database();
  db.exec('PRAGMA foreign_keys = ON');
  return new SqlJsAppDatabase(db, idb, name);
}
