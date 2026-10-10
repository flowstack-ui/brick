import {
  Button,
  Field,
  Form,
  Frame,
  HStack,
  Input,
  Text,
} from "@flowstack-ui/brick";
import { useState } from "react";
import { useForm } from "react-hook-form";
export function FormHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const [result, setResult] = useState("");
  return (
    <Frame inlineSize="100%" maxInlineSize="28rem">
      <Form onSubmit={handleSubmit(() => setResult("Saved"))}>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Email</Field.Label>
          <Input {...register("email", { required: "Email is required" })} />
          <Field.Error>{errors.email?.message}</Field.Error>
        </Field.Root>
        <HStack>
          <Button type="submit">Save</Button>
        </HStack>
        <Text>{result}</Text>
      </Form>
    </Frame>
  );
}
