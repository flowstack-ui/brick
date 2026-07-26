# Sidebar playground adoption audit

Status: **Implemented**

The `/sidebar` route owns exhaustive component evidence. The desktop playground
shell uses public Sidebar Root, Panel, Content, and Main for reusable geometry
and paint.

The application retains the `1200px` breakpoint and independently renders the
same public Nav List inside Drawer on narrower viewports. App Bar height enters
Sidebar only through `--brick-sidebar-sticky-offset`. Routing, current-route
comparison, Drawer state, and close-on-navigation remain application-owned.
