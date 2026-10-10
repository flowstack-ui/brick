import { createHash } from "node:crypto";

export function verifyArchiveDigest(bytes, expected) {
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (expected !== undefined) {
    if (!/^[a-f0-9]{64}$/iu.test(expected)) throw new Error("Invalid expected archive SHA-256");
    if (actual !== expected.toLowerCase()) throw new Error("Archive SHA-256 mismatch");
  }
  return actual;
}
