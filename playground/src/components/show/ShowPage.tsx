import { Show } from "@flowstack-ui/brick";
import { createVisibilityScenarios, VisibilityEvidencePage } from "../_visibility/VisibilityEvidencePage.js";
export const showScenarios = createVisibilityScenarios("show");
export function ShowPage() { return <VisibilityEvidencePage component={Show} id="show" scenarios={showScenarios} />; }
