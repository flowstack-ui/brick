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
- `PlaygroundFooter.tsx` owns shared footer content.
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
