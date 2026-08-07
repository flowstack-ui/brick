# Agent Knowledge

Brick ships public component and cross-component guidance for coding agents
alongside its runtime and CSS artifacts. Component guidance explains local
selection, composition, CSS delivery, recurring mistakes, and validation.
Package guides first explain layer selection and complete-interface
composition. Neither artifact adds a runtime dependency.

Use `@flowstack-ui/brick/agents/manifest.json` to discover guidance. Its
separate `guides` and `components` collections point to machine-readable JSON
and human-readable Markdown. Read `layer-selection` and
`interface-composition` before choosing individual components, for example:

```text
@flowstack-ui/brick/agents/field.json
@flowstack-ui/brick/agents/field.md
@flowstack-ui/brick/agents/layer-selection.json
@flowstack-ui/brick/agents/interface-composition.md
```

The source pair lives beside the component it describes. `agent.json` is the
structured authority and `agent.md` is generated from it. Brick guidance adds
finished visual and CSS decisions while referring behavioral ownership to
Atom. Source, types, public component docs, and tests remain authoritative when
a guide is incomplete.

Package-level guide sources live under `agents/guides/`. They use
`flowstack.agent-guide.v1`; component sources continue to use
`flowstack.agent-component.v1`. Manifest `guides` is additive, so consumers
that already read only `components` remain compatible.

For a finished Brick interface, search Brick before writing native layout,
typography, media, navigation, visibility, or control replacements. Ordinary
Brick applications do not import Atom directly. When no Brick component owns
the job, record the native or framework fallback and its missing capability.

After selecting a component, read `interface-composition` and follow its
customization order: supported props, semantic theme tokens, documented
component tokens, public compound parts, and only then a narrow `className` or
stable-hook escape hatch. The JSON artifact defines a structured gap report
for every fallback or direct Brick declaration that remains after this search.

Agent Knowledge is public usage guidance. It does not contain private prompts,
ranking policy, customer information, or application workflows.
