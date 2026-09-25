import {
  Button,
  For,
  HStack,
  Tooltip,
  type TooltipRootProps,
} from "@flowstack-ui/brick";
const policies: { label: string; props: TooltipRootProps }[] = [
  {
    label: "Keep on click",
    props: { children: null, closeOnClick: false, closeOnPointerDown: false },
  },
  { label: "Keep on scroll", props: { children: null, closeOnScroll: false } },
  { label: "Keep on Escape", props: { children: null, closeOnEscape: false } },
];
export function TooltipDismissal() {
  return (
    <HStack wrap="wrap" gap="4">
      <For each={policies}>
        {({ label, props }) => (
          <Tooltip.Root key={label} {...props}>
            <Tooltip.Trigger asChild>
              <Button variant="outline" tone="neutral">
                {label}
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content>
                {label}; leaving the trigger still closes.
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </For>
    </HStack>
  );
}
