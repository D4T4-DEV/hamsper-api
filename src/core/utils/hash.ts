import { createHash } from "crypto";

export function generateApiKeyHash(api_key: string): string {
  return createHash("sha256").update(api_key).digest("hex");
}
