import { Stack, HStack, VStack } from "../../../src/stack.js";
<Stack separator={<Stack.Separator variant="dotted" thickness="bold" />} />;
<HStack separator={<Stack.Separator extent="1rem" align="center" />} />;
<VStack separator={<span>/</span>} />;
// @ts-expect-error A list may contain only valid list children, not automatic spans.
<Stack as="ul" separator={<Stack.Separator />} />;
// @ts-expect-error Projection cannot interleave opaque host content.
<Stack asChild separator={<Stack.Separator />}>
  <div />
</Stack>;
// @ts-expect-error Separator templates must be elements.
<Stack separator="/" />;
