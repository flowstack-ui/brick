# Brick Consumer

A small private application that proves `@flowstack-ui/brick` works as a real
consumer without Core, source aliases, Tailwind, or application-specific
package behavior.

This is not the Brick documentation site and does not duplicate the component
playground. It composes released Brick components into a realistic mobile-first
page using application-owned semantic HTML and CSS.

The current integration surfaces use Button for application actions, Card for
workspace and invitation structure, and Dialog for a focused publish-confirmation
flow through their public package subpaths.

## Commands

Run these from the repository root so Brick is built first:

```bash
npm run dev
npm run build:consumer
npm run test:consumer
```

The local development server uses `http://127.0.0.1:4174` by default. Use
`npm run dev:consumer:network` when testing from another device on the local
network.

## Boundary

- Import Brick only through published package entrypoints.
- Do not alias imports to `packages/brick-ui/package/src`.
- Do not import Core or revive legacy Template Starter APIs.
- Keep exhaustive component states in the Brick playground.
- Add a consumer example only when it proves realistic composition or package
  integration.
