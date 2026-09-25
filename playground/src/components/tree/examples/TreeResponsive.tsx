import { TreeBasic } from "./TreeBasic.js";
export function TreeResponsive() {
  return (
    <TreeBasic
      size={{ initial: "xs", md: "md" }}
      density={{ initial: "comfortable", md: "compact" }}
      variant={{ initial: "plain", md: "outline" }}
    />
  );
}
