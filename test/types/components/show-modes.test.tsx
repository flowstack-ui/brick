import { Show, Hide } from "../../../src/index.js";
const user = null as { name: string } | null;
<Show when={user}>{value => <span>{value.name}</span>}</Show>;
<Show when={0} fallback={0}>value</Show>;
<Show from="md" asChild><button>Action</button></Show>;
<Hide from="md" asChild><div /></Hide>;
// @ts-expect-error modes are exclusive
<Show when={true} from="md">invalid</Show>;
// @ts-expect-error conditional mode has no ref
<Show when={true} ref={() => {}}>invalid</Show>;
// @ts-expect-error projection excludes as
<Show from="md" asChild as="section"><div /></Show>;
// @ts-expect-error projection needs an element
<Hide from="md" asChild>text</Hide>;
// @ts-expect-error responsive mode has no fallback
<Hide from="md" fallback="no">content</Hide>;
