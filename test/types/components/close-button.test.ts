import { CloseButton, type CloseButtonProps } from "../../../src/close-button.js";
const props: CloseButtonProps = { size: {lg:"sm"}, focusRing:"inside", "aria-label":"Close settings" };
void props; void CloseButton;
// @ts-expect-error CloseButton cannot navigate
const bad: CloseButtonProps = {href:"/home"};void bad;
// @ts-expect-error CloseButton cannot submit
const submit: CloseButtonProps = {type:"submit"};void submit;
