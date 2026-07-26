# Nav List playground adoption audit

Status: **Implemented**

The component route owns the complete approved recipe, content, section,
composition, appearance, and stress evidence. The playground sidebar now uses
the public `NavList` compound API for its real navigation anatomy.

## Adopted locations

- `ComponentNavigation` uses every part needed by the grouped sidebar.
- Route selection and drawer closing remain application-owned.
- Scenario navigation remains its specialized ordered in-page anchor control.

## Retained application policy

The shell continues to group registry entries and compare the current route.
Nav List owns rendered navigation structure, state attributes, focus, and
finished presentation; it does not own routing or scrollspy behavior.
