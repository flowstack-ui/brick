# AGENTS.md — Brick Public Package

This folder is the future public repository and npm package for
`@flowstack-ui/brick`.

While it is staged inside TemplateFlow, also read:

1. `../AGENTS.md`
2. `../CURRENT.md`
3. `../TODO.md`
4. `../docs/README.md`

Do not copy product-definition documents into this package. They belong to the
private Brick workspace until a reviewed public document is intentionally
created for the standalone repository.

## Boundary

- Use public `@flowstack-ui/atom` entrypoints only.
- Do not depend on `@templateflow/core`, Next.js, the showcase, or private
  workspace documents.
- Source belongs in `src/`, tests in `test/`, package scripts in `scripts/`,
  and the repo-only development app in `playground/`.
- Do not edit or commit `dist/` or `node_modules/`.
- Do not implement components while the parent workspace marks product
  definition as active.

Before standalone extraction, replace staging-only parent references with the
public package documentation that the adopted product decisions require.

