# Playground shell

Keep shared page chrome here, not inside individual component examples.

- `PlaygroundShell.tsx` owns overall layout, mobile navigation state and focus
  restoration, and the page-content slot.
- `PlaygroundAppBar.tsx` owns the brand link, settings entry and mobile navigation trigger.
- `PlaygroundSettingsPopover.tsx` composes the shared preferences form. State,
  parsing and persistence belong to `../settings/`, not to this popover.
- `PlaygroundMobileNav.tsx` composes the controlled navigation drawer.
- `PlaygroundPageHeader.tsx` owns the page introduction, migration status and
  scenario navigation.
- `PlaygroundAiTip.tsx` owns the shared static AI guidance below resource links.
  It composes Alert's bordered warning paint, Badge, Stack and Text without
  custom CSS. Agent Skills is plain text until a destination is approved;
  do not add a placeholder link, click handler or live announcement role.
- `PlaygroundFooter.tsx` owns previous/next documentation links, within the
  article column. `navigation-order.ts` shares category/title ordering with
  the sidebar; omit missing neighbors at the ends instead of wrapping routes.

Docs-style pages register section metadata and their edit URL in
`app/docs-routes.ts`. This shared map drives the rail and suppresses the legacy
scenario menu; do not add per-component conditions to the shell. Keep examples
and their raw source together, typed props/section data separate, and retained
qualification scenarios behind the owner's qualification/preview path.

Copyable `components/*/examples/*.tsx` files must be formatted with
`npm run format:playground-examples` before handoff. The playground build checks
this with pinned Prettier: readable indentation, multiline JSX returns wrapped
in parentheses, and consistently wrapped imports/props. Display the executable
file through its raw import, without separate hand-maintained source strings.
Keep test-only IDs out of these files; locate examples through their shared
preview wrapper and component anatomy. The formatting check also enforces this.
- `ComponentNavigation.tsx` owns the reusable component index.
- `branding/BrickLogo.tsx` contains the SVG asset and its Frame size constraint.

Keep state shared by the app bar and drawer in the shell. Extract meaningful
sections, not every layout wrapper. Use public Brick components for layout and
interaction. Keep component-specific examples in their component directories.
The logo uses one inline-size constraint; its SVG viewBox preserves the ratio.

The app bar stays sticky at all viewport sizes through Brick's position prop.
Preserve Brick's default app-bar and overlay layers: do not lower menus,
tooltips, or other public overlay parts to place them below playground chrome.
`data-playground-app-bar` is a test locator, not a styling override. Responsive
secondary-header behavior remains playground-owned.

The shell always remains LTR. Appearance affects the shell; Qualification and
example direction apply only to the isolated preview runner. Controls that
cannot affect legacy inline evidence are disabled with an explanation. See
`../preview/README.md` before migrating examples.
