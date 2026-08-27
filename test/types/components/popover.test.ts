import { Popover, type PopoverDensity } from "../../../src/popover.js";
void Popover;

const densities: PopoverDensity[] = ["comfortable", "compact"];
void densities;

// @ts-expect-error Popover density is closed.
const invalidDensity: PopoverDensity = "dense";
void invalidDensity;
