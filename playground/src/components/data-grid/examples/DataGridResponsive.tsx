import { DataGridBasic } from "./DataGridBasic.js";
export function DataGridResponsive() {
  return (
    <DataGridBasic
      size={{ initial: "sm", md: "lg" }}
      density={{ initial: "compact", md: "comfortable" }}
      variant={{ initial: "line", md: "outline" }}
      minInlineSize={420}
    />
  );
}
