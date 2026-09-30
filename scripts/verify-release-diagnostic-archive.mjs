import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const [directory, mode] = process.argv.slice(2);
if (!directory || (mode && mode !== "--record")) throw new Error("Expected archive directory and optional --record");
const sourceCommit = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const archiveSha256 = createHash("sha256").update(readFileSync(resolve(directory, "flowstack-ui-brick-0.3.0.tgz"))).digest("hex");
const path = resolve(directory, "identity.json");
if (mode === "--record") writeFileSync(path, JSON.stringify({ sourceCommit, archiveSha256, sourceRun: process.env.GITHUB_RUN_ID ?? null }, null, 2));
const identity = JSON.parse(readFileSync(path, "utf8"));
if (identity.sourceCommit !== sourceCommit || identity.archiveSha256 !== archiveSha256) throw new Error("Archive hash or candidate commit mismatch");
console.log(JSON.stringify(identity));
