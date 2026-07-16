# Releasing

Before publishing a package version:

1. Update the package changelog and every affected component changelog.
2. Run `npm run check`.
3. Run `npm run test:browser:release` for desktop Chromium, Firefox, WebKit,
   Pixel, and iPhone coverage. Review Chromium visual diffs explicitly.
4. Complete the affected numbered manual-test protocols.
5. Run `npm run size:css` and review changes in readable, minified, gzip, and
   Brotli output.
6. Run `npm run pack:check` and inspect the public file list.
7. Install the real tarball in clean React 18 and React 19 consumers.
8. Confirm JavaScript and CSS entrypoints resolve without private files or a
   consumer CSS processor.

Do not update screenshot baselines or accessibility exceptions without
reviewing the underlying public change.
