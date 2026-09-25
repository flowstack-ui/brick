import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridResponsive() {
  return (
    <TreeGridBasic
      size={{ initial: "sm", md: "md" }}
      density={{ initial: "compact", lg: "comfortable" }}
      variant={{ initial: "line", md: "outline" }}
      minInlineSize="32rem"
    />
  );
}
