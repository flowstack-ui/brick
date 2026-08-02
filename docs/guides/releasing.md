# Releasing

Before publishing a package version:

1. Confirm every affected public contract has an approved implementation and
   no unresolved Atom-owned defect. Brick must depend on the exact released
   Atom version used by the evidence.
2. Update source, tests, playground, manual protocol, public guide, component
   changelog, package changelog, workbook, and Consumer proof together.
3. Run `npm run check:release`. It builds the package once for repository
   checks, then adds desktop Chromium, Firefox, WebKit, Pixel, and iPhone
   coverage, the packed application Consumer, and the CSS-size report. Review
   Chromium visual diffs explicitly.
4. Confirm the clean React 18 and React 19 progress log completed both runtime
   and type-consumer checks.
5. Complete each affected component's numbered manual protocol. Any required
   physical environment not used is `blocked`, never passed by inference.
6. Recalculate and visually inspect changed workbook sheets; verify the Index
   and sample every `tested` or `verified` evidence claim.
7. Review the release tier's readable, minified, gzip, and Brotli CSS output.
8. Inspect the release tier's public package file list.
9. Confirm JavaScript and CSS entrypoints resolve without private files or a
   consumer CSS processor.

Do not update screenshot baselines or accessibility exceptions without
reviewing the underlying public change.

Do not release a component with shared primary evidence, an unrun required
manual protocol, an unresolved workbook row, stale documentation, or a
Consumer/package-boundary failure. Record genuine environment blockers and
leave the release gate open.

## npm publication

Tags matching the exact package version run the protected `npm` environment in
`.github/workflows/publish.yml`. The workflow verifies the release commit is on
`main`, runs the repository gate, distributes the five browser profiles across
clean jobs, creates one archive, verifies that same archive through package,
React 18/19, and application Consumer checks, and publishes only that archive
with provenance.

For the first publication, place a short-lived granular npm token in the
protected environment as `NPM_TOKEN`. After the package exists, configure npm
trusted publishing for `flowstack-ui/brick`, `.github/workflows/publish.yml`,
and the `npm` environment, then remove the bootstrap token. Later releases use
the workflow's OIDC identity and do not require a long-lived npm secret.
