import { useState } from "react";
import {
  Button,
  Field,
  FileUpload,
  Form,
  Frame,
  HStack,
  Text,
} from "@flowstack-ui/brick";

export function FileUploadForm() {
  const [message, setMessage] = useState("No submission");
  return (
    <Frame maxInlineSize={400}>
      <Form
        preventDefaultOnSubmit
        onSubmit={(event) =>
          setMessage(
            `${new FormData(event.currentTarget).getAll("attachments").length} attachment submitted`,
          )
        }
        onReset={() => setMessage("Selection reset")}
      >
        <Field.Root required>
          <Field.Label>Attachment</Field.Label>
          <FileUpload.Root name="attachments">
            <FileUpload.HiddenInput />
            <FileUpload.Trigger size="sm">Choose attachment</FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
          <Field.Error>Choose an attachment.</Field.Error>
        </Field.Root>
        <HStack gap="2">
          <Button type="submit" size="sm">
            Submit
          </Button>
          <Button type="reset" size="sm" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text role="status">{message}</Text>
      </Form>
    </Frame>
  );
}
