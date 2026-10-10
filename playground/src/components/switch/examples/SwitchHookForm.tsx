import { Button, Form, Switch, Text, VStack } from "@flowstack-ui/brick";
import { Controller, useForm } from "react-hook-form";

export function SwitchHookForm() {
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: { alerts: false },
  });
  return (
    <Form
      aria-label="Alert preferences"
      preventDefaultOnSubmit
      onSubmit={handleSubmit(() => undefined)}
    >
      <VStack align="start" gap="3">
        <Controller
          name="alerts"
          control={control}
          rules={{ required: "Turn on critical alerts." }}
          render={({ field, fieldState }) => (
            <Switch.Field
              checked={field.value}
              onCheckedChange={field.onChange}
              invalid={fieldState.invalid}
              name={field.name}
            >
              <Switch.Control
                onBlur={field.onBlur}
                aria-required="true"
                aria-describedby="alerts-error"
              />
              <Switch.Label>Critical service alerts</Switch.Label>
              <Switch.HiddenInput ref={field.ref} />
            </Switch.Field>
          )}
        />
        {formState.errors.alerts ? (
          <Text id="alerts-error" tone="danger">
            {formState.errors.alerts.message}
          </Text>
        ) : null}
        <Button type="submit">Save</Button>
        <Button
          type="button"
          variant="outline"
          tone="neutral"
          onClick={() => reset()}
        >
          Reset
        </Button>
      </VStack>
    </Form>
  );
}
