import { randomBytes } from "crypto";

export function generateApiKeys(prefix: string = "ham_pk_"): string {
  return `${prefix}${randomBytes(20).toString("hex")}`;
}
