import { spawnSync } from "node:child_process";

const testPort = 4011;
const result = spawnSync(
  "lsof",
  ["-nP", `-iTCP:${testPort}`, "-sTCP:LISTEN"],
  { encoding: "utf8" },
);

if (result.error?.code === "ENOENT") {
  console.warn(
    "lsof is unavailable; the Consumer relies on strict-port startup for its final collision check.",
  );
} else if (result.status === 0 && result.stdout.trim()) {
  throw new Error(
    `Consumer test port ${testPort} is occupied. Stop the stale or unrelated process before testing.\n${result.stdout.trim()}`,
  );
} else {
  console.log("The Consumer automated-test port is available.");
}
