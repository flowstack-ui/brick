import { ToggleGroup, type ToggleGroupRootProps } from "../../../src/toggle-group.js";
const neutralGroup: ToggleGroupRootProps = { tone: "neutral", type: "single" };
void ToggleGroup; void neutralGroup;
// @ts-expect-error ToggleGroup tones do not represent semantic status.
const badGroup: ToggleGroupRootProps = { tone: "danger", type: "single" };
void badGroup;
