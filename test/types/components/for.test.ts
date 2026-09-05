import { For, type ForProps } from "../../../src/for.js";

const props: ForProps<readonly { id: number }[]> = { each: [{ id: 1 }], children: item => item.id };
For(props);
For<readonly string[] | undefined>({ each: undefined, fallback: "Empty", children: item => item.toUpperCase() });
const mixed = Math.random() > 0.5
  ? ([{ kind: "text", value: "One" }] as const)
  : ([{ kind: "count", value: 2 }] as const);
For({
  each: mixed,
  children: item => item.kind === "text" ? item.value : item.value.toFixed(),
});
// @ts-expect-error Render callback is required.
For({ each: [1, 2] });
