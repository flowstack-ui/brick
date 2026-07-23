# Releasing

Before publishing a package version:

1. Confirm every affected public contract has an approved implementation and
   no unresolved Atom-owned defect. Brick must depend on the exact released
   Atom version used by the evidence.
2. Update source, tests, playground, manual protocol, public guide, component
   changelog, package changelog, workbook, and Consumer proof together.
3. Run `npm run check`.
4. Run `npm run test:browser:release` for desktop Chromium, Firefox, WebKit,
   Pixel, and iPhone coverage. Review Chromium visual diffs explicitly.
5. Complete each affected component's numbered manual protocol. Any required
   physical environment not used is `blocked`, never passed by inference.
6. Recalculate and visually inspect changed workbook sheets; verify the Index
   and sample every `tested` or `verified` evidence claim.
7. Run `npm run size:css` and review changes in readable, minified, gzip, and
   Brotli output.
8. Run `npm run pack:check` and inspect the public file list.
9. Run `npm run verify:consumers` for clean React 18 and React 19 consumers.
10. Run `npm run verify:consumer` for the realistic packed-package app.
11. Confirm JavaScript and CSS entrypoints resolve without private files or a
   consumer CSS processor.

Do not update screenshot baselines or accessibility exceptions without
reviewing the underlying public change.

Do not release a component with shared primary evidence, an unrun required
manual protocol, an unresolved workbook row, stale documentation, or a
Consumer/package-boundary failure. Record genuine environment blockers and
leave the release gate open.
