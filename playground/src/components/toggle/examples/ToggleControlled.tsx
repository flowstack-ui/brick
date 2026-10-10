import { Toggle } from "@flowstack-ui/brick";

import { useState } from "react";
export function ToggleControlled() {
  const [value, setValue] = useState(false);
  return (
    <Toggle pressed={value} onPressedChange={setValue}>
      Bold
    </Toggle>
  );
}
