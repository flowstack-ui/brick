import {
  Button,
  For,
  HStack,
  toast,
  type ToastType,
} from "@flowstack-ui/brick";
const types: ToastType[] = [
  "default",
  "success",
  "error",
  "warning",
  "info",
  "loading",
];
export function ToastTypes() {
  return (
    <HStack gap={3} wrap>
      <For each={types}>
        {(type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() =>
              toast({
                title: type === "loading" ? "Uploading file" : type,
                type,
              })
            }
          >
            {type}
          </Button>
        )}
      </For>
    </HStack>
  );
}
