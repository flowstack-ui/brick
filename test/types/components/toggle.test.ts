import { Toggle, type ToggleTone } from "../../../src/toggle.js";
const tone: ToggleTone = "neutral";
void Toggle; void tone;
// @ts-expect-error Toggle tones do not represent semantic status.
const badTone: ToggleTone = "danger";
void badTone;
