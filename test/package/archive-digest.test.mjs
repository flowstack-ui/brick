import assert from "node:assert/strict";
import test from "node:test";
import { verifyArchiveDigest } from "../../scripts/verify-archive-digest.mjs";

test("consumer archives report and verify their exact bytes", () => {
  const bytes = Buffer.from("abc");
  const expected = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
  assert.equal(verifyArchiveDigest(bytes), expected);
  assert.equal(verifyArchiveDigest(bytes, expected.toUpperCase()), expected);
  assert.throws(() => verifyArchiveDigest(Buffer.from("different"), expected), /mismatch/);
  assert.throws(() => verifyArchiveDigest(bytes, "latest"), /Invalid/);
});
