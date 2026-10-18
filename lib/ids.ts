import { ulid } from "ulid";

/** Time-ordered primary keys. Generated in the app, not by Postgres. */
export function createId() {
  return ulid();
}
