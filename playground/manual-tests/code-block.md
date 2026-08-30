# Code Block manual-test protocol

| Environment | Record before testing |
| --- | --- |
| Component | Code Block |
| Version or commit | Brick 0.1.12 candidate |
| Reviewer | Codex visual review; VoiceOver run pending |
| Date | 2026-08-30 |
| Browser and version | Chrome stable; exact version recorded at run |
| Operating system | macOS |
| Viewport and zoom | 320, 390, 1440 CSS px; 100%, 200%, 400% |
| Physical device | Mac; no physical touch contract |
| Assistive technology | macOS VoiceOver pending |
| Playground route | `/code-block` |

Scenario order: Overview → Variants → Sizes → Optional anatomy → Content and
language → Wrapping and overflow → Copy states → Appearance and customization
→ Line metadata → Bounded and collapsible source → Responsive and RTL.

Use `pass`, `fail`, `blocked`, or `not applicable` for each result.

| Step | Setup and action | Expected | Result | Notes or issue |
| --- | --- | --- | --- | --- |
| 1 | Open Overview and inspect the live structure. | No header/action/status; one named focusable viewport; exact `pre > code` source. | | |
| 2 | Review Variants then Sizes top to bottom. | Only named surface/density changes; source and behavior remain identical. | | |
| 3 | Traverse Optional anatomy by keyboard and copy once. | Title, `tsx`, Copy source, Content, and Status follow logical focus order; status moves pending to copied and focus stays on Trigger. | | |
| 4 | Review raw markup and trusted pre-tokenized React output. | Raw markup displays as text; the tokenized `import` is styled without unsafe markup execution. | | |
| 5 | Focus Scroll, use horizontal keys, then compare Wrap. | Preserved lines remain reachable through one scroll owner; Wrap reflows the same source without a second scroll region. | | |
| 6 | Inspect every Line metadata state in preserved and wrapped examples. | Authored numbers align; focus/highlight remain distinct; additions/removals stay readable without reducing sibling contrast. | | |
| 7 | Keyboard-scroll bounded source, then activate Show full source. | `aria-expanded` changes; bounded preview leaves the accessibility tree; Collapsible Content becomes the controlled region and reveals every line. | | |
| 8 | Run Success, Error, and Disabled copy states. | Truthful copied/error wording resets after about 1.5 seconds; disabled never copies; Trigger focus is retained. | | |
| 9 | Compare light/dark defaults and the customized dark block. | Customized surface, text, border, and radius match the visible contract while focus and source remain readable. | | |
| 10 | Repeat at 320/390 px, 200% text, 400% zoom, text-spacing override, long content, and RTL. | No page overflow; all lines remain reachable; logical header mirrors while source remains LTR. | | |
| 11 | Repeat the primary path with keyboard, forced colors, and the recorded screen reader. | Every viewport has its authored name, focus remains visible, and copy status is announced politely once without duplicate content. | | |

## Completion

Overall result: pending recorded run

Follow-up issues:

Workbook updated:
