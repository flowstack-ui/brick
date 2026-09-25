import { useId } from "react";
import { CheckboxGroup, Fieldset } from "@flowstack-ui/brick";

export function FieldsetChoices() {
  const legendId = useId();
  return (
    <Fieldset.Root>
      <Fieldset.Legend id={legendId}>Notifications</Fieldset.Legend>
      <Fieldset.Description>
        Choose how we can contact you.
      </Fieldset.Description>
      <Fieldset.Content>
        <CheckboxGroup.Root
          aria-labelledby={legendId}
          name="notifications"
          defaultValue={["email"]}
        >
          <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
          <CheckboxGroup.Item value="sms">Text message</CheckboxGroup.Item>
          <CheckboxGroup.Item value="push">
            Push notification
          </CheckboxGroup.Item>
        </CheckboxGroup.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
}
