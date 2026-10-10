import { Link, HStack } from "@flowstack-ui/brick";
import { BookOpen, ArrowRight } from "lucide-react";

export function LinkIcons() {
  return (
    <HStack gap="6" wrap="wrap">
      <Link href="#usage" startIcon={<BookOpen />}>
        Read the guide
      </Link>
      <Link href="#examples" endIcon={<ArrowRight />}>
        Next example
      </Link>
    </HStack>
  );
}
