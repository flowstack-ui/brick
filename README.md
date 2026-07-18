# Brick Consumer

A small private application that proves `@flowstack-ui/brick` works as a real
consumer without Core, source aliases, Tailwind, or application-specific
package behavior.

This is not the Brick documentation site and does not duplicate the component
playground. It composes released Brick components into a realistic mobile-first
page using application-owned semantic HTML and CSS.

The current integration surfaces use Button for application actions, Card for
workspace and invitation structure, Dialog for a focused publish-confirmation
flow, AlertDialog for a destructive decision, Drawer for an application-owned
filter workflow, Badge for passive workspace status, Avatar for collaborator
identity and presence, and NotificationBadge for
a clearly named task control through their public package subpaths.

## Commands

Run these from the repository root so Brick is built first:

```bash
npm run dev
npm run build:consumer
npm run test:consumer
```

The local development server uses `http://127.0.0.1:3011`. From the TemplateFlow
root, use `npm run dev:consumer:network` when testing from another device on the
local network. From this app directory, use `npm run dev:network`. With the
currently used LAN address, the URL is `http://192.168.4.36:3011`; prefer the
Network URL printed by Vite if the address changes.

Playwright uses local preview port `4011` only while browser tests run. Both
development and preview ports are strict and do not silently increment.

## Boundary

- Import Brick only through published package entrypoints.
- Do not alias imports to `packages/brick-ui/package/src`.
- Do not import Core or revive legacy Template Starter APIs.
- Keep exhaustive component states in the Brick playground.
- Add a consumer example only when it proves realistic composition or package
  integration.
