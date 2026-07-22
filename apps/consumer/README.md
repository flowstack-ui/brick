# Brick Consumer

A small repository-only application that proves `@flowstack-ui/brick` works as
a real consumer without source aliases, CSS processors, or application-specific
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

The local development server uses `http://127.0.0.1:3011`. From the repository
root, use `npm run dev:consumer:network` when testing from another device on the
local network. From this app directory, use `npm run dev:network`. Prefer the
Network URL printed by Vite because the machine's LAN address can change.

Playwright uses local preview port `4011` only while browser tests run. Both
development and preview ports are strict and do not silently increment.

## Boundary

- Import Brick only through published package entrypoints.
- Do not alias imports to Brick source or distribution files.
- Keep exhaustive component states in the Brick playground.
- Add a consumer example only when it proves realistic composition or package
  integration.
