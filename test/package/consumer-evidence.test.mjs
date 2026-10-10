import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, access, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

for (const [script, label, fixture] of [
  ["verify-consumers.mjs", "React consumer", "react-18/package.json"],
  ["verify-app-consumer.mjs", "Application Consumer", "consumer/package.json"],
]) {
  test(`${label} preserves diagnostic fixtures when installation fails`, { skip: process.platform === "win32" ? "POSIX executable fixture" : false }, async () => {
    const directory = await mkdtemp(resolve(tmpdir(), "brick-consumer-evidence-test-"));
    let retained;
    try {
      const bin = resolve(directory, "bin");
      await mkdir(bin);
      await writeFile(resolve(bin, "npm"), `#!${process.execPath}\nprocess.stderr.write('intentional install failure');process.exit(17);\n`, { mode: 0o755 });
      const archive = resolve(directory, "candidate.tgz");
      await writeFile(archive, "test archive bytes; mocked installer must not unpack");
      const env = { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH}` };
      delete env.FLOWSTACK_ATOM_TARBALL;
      delete env.FLOWSTACK_ATOM_SHA256;
      const result = spawnSync(process.execPath, [resolve(import.meta.dirname, "../../scripts", script), "--tarball", archive], {
        cwd: resolve(import.meta.dirname, "../.."), env, encoding: "utf8", timeout: 15_000,
      });
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /intentional install failure/);
      assert.match(result.stdout, /Brick archive SHA-256: [a-f0-9]{64}/);
      retained = result.stderr.match(/failure evidence retained at ([^\n]+)/)?.[1];
      assert.ok(retained, result.stderr);
      assert.ok(retained.startsWith(resolve(tmpdir(), "brick-")));
      await access(resolve(retained, fixture));
    } finally {
      if (retained?.startsWith(resolve(tmpdir(), "brick-"))) await rm(retained, { recursive: true, force: true });
      await rm(directory, { recursive: true, force: true });
    }
  });
}
