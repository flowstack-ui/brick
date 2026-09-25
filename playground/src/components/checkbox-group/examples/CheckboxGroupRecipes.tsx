import { CheckboxGroup } from "@flowstack-ui/brick";
export function CheckboxGroupRecipes() {
  return (
    <CheckboxGroup.Root
      aria-label="Project access"
      size={{ initial: "sm", md: "md" }}
      variant="outline"
      tone="neutral"
      defaultValue={["view", "edit"]}
    >
      <CheckboxGroup.Item value="view">View projects</CheckboxGroup.Item>
      <CheckboxGroup.Item value="edit" tone="accent" variant="subtle">
        Edit projects
      </CheckboxGroup.Item>
    </CheckboxGroup.Root>
  );
}
