import { Button, ButtonGroup } from "../../../src/button.js";
import { IconButton } from "../../../src/icon-button.js";
<ButtonGroup attached size={{lg:"sm"}} variant="surface" radius="full"><Button loadingText="Saving" spinnerPlacement="end" /><IconButton aria-label="Add">+</IconButton></ButtonGroup>;
<Button variant="subtle" spinner={<span />} />;
<Button variant="plain" />;
// @ts-expect-error content replacement is unavailable with asChild
<Button asChild loadingText="Saving"><a href="/">Home</a></Button>;
// @ts-expect-error groups share presentation, not interaction state
<ButtonGroup loading />;
// @ts-expect-error unknown recipe
<Button variant="unknown" />;
