import { For, Steps } from "@flowstack-ui/brick";
export function StepsResponsive() {
  return (
    <Steps.Root
      count={3}
      defaultStep={1}
      size={{ initial: "xs", md: "md" }}
      variant={{ initial: "subtle", lg: "solid" }}
    >
      <Steps.List aria-label="Workflow">
        <For each={["Account", "Details", "Review"]}>
          {(title, index) => (
            <Steps.Item key={title} index={index}>
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Title>{title}</Steps.Title>
              </Steps.Trigger>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>
    </Steps.Root>
  );
}
