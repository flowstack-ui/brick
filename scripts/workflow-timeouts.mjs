// A reusable-workflow caller cannot set timeout-minutes; its runner jobs do.
export async function hasWorkflowTimeout(
  path,
  readSource,
  visited = new Set(),
) {
  if (visited.has(path)) return false;
  const next = new Set([...visited, path]);
  let source;
  try {
    source = await readSource(path);
  } catch {
    return false;
  }
  if (/^\s+timeout-minutes:\s*[1-9]\d*\s*$/m.test(source)) return true;
  const jobs = source.split(/^jobs:\s*$/m)[1];
  if (!jobs) return false;
  const bodies = jobs.split(/^  [\w-]+:\s*$/m).slice(1);
  if (!bodies.length) return false;
  for (const body of bodies) {
    const target = body.match(
      /^    uses: \.\/(\.github\/workflows\/[\w-]+\.ya?ml)\s*$/m,
    )?.[1];
    if (!target || /^    (?:steps|runs-on):/m.test(body)) return false;
    if (!(await hasWorkflowTimeout(target, readSource, next))) return false;
  }
  return true;
}
