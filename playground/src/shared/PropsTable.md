# Props table

PropsTable is a reusable playground documentation composition. Keep each
component's rows in its own typed data module using DocsPropDefinition<Props>.
Use exact public prop names, type labels, and effective defaults from the
component source. Show an em dash for an unset default, not for a known default.
Do not infer APIs from reference-library documentation or copy their defaults.
For finite value sets such as Radius, show the allowed values in the Type column
instead of only the alias name. Mention the shared type in the description so
readers can discover both the choices and their common contract.

Place it after Guide inside a linked Props DocsSection. Document the component's
own props and relevant supported composition options; omit the exhaustive native
HTML attribute list. Compound components can supply a separately named table per
part. This table is documentation, not a new Brick export or universal schema.

Use native Table with row and column headers, Code for identifiers, Paragraph
for descriptions, and For for rows. Surface paints the header; table body is
transparent. A named keyboard-focusable horizontal ScrollArea preserves all
three columns if exceptional content overflows. Do not replace it with generic
layout or hide type/default information on mobile. Let the table fit its content
column without a forced minimum width; Code wraps long identifiers and unions.
Test desktop and narrow containment rather than requiring horizontal scrolling.

Changes to a component API must update these rows and their browser assertions
alongside its public README and Agent Knowledge; typed names alone do not verify
descriptions, defaults or completeness. Keep layout CSS out of owner data files.
