import { Controller, useForm } from "react-hook-form";
import {
  Combobox,
  Field,
  Frame,
  VStack,
  HStack,
  Button,
} from "@flowstack-ui/brick";
export function ComboboxHookForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { framework: "" } });
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];
  return (
    <Frame maxInlineSize="28rem">
      <form onSubmit={handleSubmit(() => undefined)} noValidate>
        <VStack gap={4}>
          <Controller
            control={control}
            name="framework"
            rules={{ required: "Choose a framework." }}
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error}>
                <Field.Label>Framework</Field.Label>
                <Combobox.Root
                  options={options}
                  value={field.value || null}
                  onValueChange={(next) => field.onChange(next ?? "")}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      ref={field.ref}
                      onBlur={field.onBlur}
                      placeholder="Choose framework"
                    />
                    <Combobox.Trigger />
                  </Combobox.Control>
                  <Combobox.Portal>
                    <Combobox.Content>
                      <Combobox.Listbox>
                        {options.map((item) => (
                          <Combobox.Item key={item.value} value={item.value}>
                            {item.label}
                          </Combobox.Item>
                        ))}
                      </Combobox.Listbox>
                    </Combobox.Content>
                  </Combobox.Portal>
                </Combobox.Root>
                <Field.Error>{fieldState.error?.message}</Field.Error>
              </Field.Root>
            )}
          />
          <HStack gap={3}>
            <Button type="submit">
              {isSubmitSuccessful ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" onPress={() => reset()}>
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>
    </Frame>
  );
}
