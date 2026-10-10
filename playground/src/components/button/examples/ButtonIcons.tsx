import { Button, HStack } from "@flowstack-ui/brick";
import { Mail, ArrowRight } from "lucide-react";
export function ButtonIcons() {
  return (
    <HStack gap="3" wrap="wrap">
      <Button startIcon={<Mail />}>Email</Button>
      <Button endIcon={<ArrowRight />}>Continue</Button>
    </HStack>
  );
}
