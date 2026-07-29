import { Hide } from "@flowstack-ui/brick";
import { createVisibilityScenarios, VisibilityEvidencePage } from "../_visibility/VisibilityEvidencePage.js";
export const hideScenarios = createVisibilityScenarios("hide");
export function HidePage() { return <VisibilityEvidencePage component={Hide} id="hide" scenarios={hideScenarios} />; }
