import { useRef, useState } from "react";
import { Alert, VStack, Button, CloseButton } from "@flowstack-ui/brick";
export function AlertClose() {
  const [visible, setVisible] = useState(true);
  const restore = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap="4" align="start">
      <Button
        ref={restore}
        size="sm"
        variant="outline"
        onClick={() => setVisible(true)}
      >
        Restore notice
      </Button>
      {visible && (
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Project created</Alert.Title>
            <Alert.Description>
              You can now invite your teammates.
            </Alert.Description>
          </Alert.Content>
          <CloseButton
            size="xs"
            aria-label="Dismiss notice"
            onClick={() => {
              setVisible(false);
              restore.current?.focus();
            }}
          />
        </Alert.Root>
      )}
    </VStack>
  );
}
