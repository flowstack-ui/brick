import { For, Steps } from "@flowstack-ui/brick";

export function StepsReadOnly() {
  return (
    <Steps.Root count={3} step={1}>
      <Steps.List aria-label="Order progress">
        <For each={["Received", "Preparing", "Delivered"]}>
          {(title, index) => (
            <Steps.Item key={title} index={index}>
              <Steps.Indicator />
              <Steps.Title>{title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
        </For>
      </Steps.List>
    </Steps.Root>
  );
}
