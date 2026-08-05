# Agent Knowledge

Brick ships public component guidance for coding agents alongside its runtime
and CSS artifacts. The guidance explains when to select a finished component,
how to compose it through public parts, which styles it needs, recurring
mistakes, and how to validate the result. It adds no runtime dependency.

Use `@flowstack-ui/brick/agents/manifest.json` to discover covered components.
Each manifest entry points to both machine-readable JSON and human-readable
Markdown, for example:

```text
@flowstack-ui/brick/agents/field.json
@flowstack-ui/brick/agents/field.md
```

The source pair lives beside the component it describes. `agent.json` is the
structured authority and `agent.md` is generated from it. Brick guidance adds
finished visual and CSS decisions while referring behavioral ownership to
Atom. Source, types, public component docs, and tests remain authoritative when
a guide is incomplete.

Agent Knowledge is public usage guidance. It does not contain private prompts,
ranking policy, customer information, or application workflows.
