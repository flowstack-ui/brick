import { Button, IconButton, CloseButton } from "../../../src/index.js";
<IconButton aria-label="Refresh" loading spinner={<svg />}><svg /></IconButton>;
<CloseButton loading spinner={<svg />} />;
// @ts-expect-error icon-only controls do not have text loading
<IconButton aria-label="Refresh" loadingText="Working"><svg /></IconButton>;
// @ts-expect-error asChild cannot add a custom spinner
<IconButton aria-label="Refresh" asChild spinner={<svg />}><button /></IconButton>;
// @ts-expect-error internal presentation is not a public Button prop
<Button iconOnly>Save</Button>;
