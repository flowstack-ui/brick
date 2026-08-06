# AppBar agent guide

## Purpose

Provide a finished top surface and one-row start, geometrically centered, and end alignment structure built on Atom AppBar.

## Use when

- A page or application header needs branding, navigation, location, search, or persistent actions on one top surface.

## Choose something else when

- The need is a complete responsive shell, navigation system, or grouped-control keyboard model. Use AppBar composed with Show/Hide, NavigationMenu or NavList, Drawer, and Toolbar as appropriate.

## Required composition

- Compose Root > Toolbar > Start, Center, and End, then place Brick brand, navigation, text, and action components in the matching sections.

## Rules

- **MUST:** Do not treat AppBar.Toolbar as an ARIA toolbar; compose Toolbar for grouped-control keyboard behavior.
- **MUST:** Keep application-specific visibility and wrapping policy outside AppBar and implement it with Brick responsive/layout components.
- **MUST:** Load styles.css or core.css plus app-bar.css.

## Common mistakes

- **Avoid:** Hand-building a header row with div and flex CSS or expecting AppBar to create menus and breakpoints. **Instead:** Use AppBar for the top surface and compose the dedicated navigation, layout, and visibility owners inside it.

## Validation checklist

- Check geometric centering with unequal side content, truncation, zoom, narrow widths, and RTL.
- Confirm landmark names, actions, navigation, and modular CSS are complete.

## Related guidance

- `toolbar`
- `navigation-menu`
- `nav-list`
- `drawer`
- `show`
- `hide`
- `stack`
