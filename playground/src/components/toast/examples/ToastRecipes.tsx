import { Button, HStack, toast } from "@flowstack-ui/brick";
export function ToastRecipes() {
  return (
    <HStack gap={3} wrap>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Surface notification", { variant: "surface" })
        }
      >
        Surface
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Accent notification", {
            variant: "solid",
            tone: "accent",
            radius: "sm",
          })
        }
      >
        Solid accent
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Contrast notification", { variant: "solid", tone: "contrast" })
        }
      >
        Solid contrast
      </Button>
    </HStack>
  );
}
