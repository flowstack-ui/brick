import { Link } from "@flowstack-ui/brick";

export function LinkComposition() {
  return (
    <Link asChild href="#usage">
      <a>Composed anchor</a>
    </Link>
  );
}
