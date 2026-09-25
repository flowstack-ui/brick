import { Spinner } from "@flowstack-ui/brick";
import { LoaderCircle } from "lucide-react";
export function SpinnerCustomIndicator() {
  return (
    <Spinner asChild size="lg" tone="accent">
      <LoaderCircle />
    </Spinner>
  );
}
