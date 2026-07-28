// Minimal ambient types for Node's built-in SQLite (node:sqlite).
// The project pins @types/node@20, which predates this module. This declares
// only the surface we use. Remove once @types/node is bumped to a version
// that ships node:sqlite types.
declare module "node:sqlite" {
  type SqlValue = string | number | bigint | boolean | null | Uint8Array;

  export class StatementSync {
    run(...params: SqlValue[]): {
      changes: number | bigint;
      lastInsertRowid: number | bigint;
    };
    get(...params: SqlValue[]): unknown;
    all(...params: SqlValue[]): unknown[];
  }

  export class DatabaseSync {
    constructor(location: string, options?: { readOnly?: boolean });
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
