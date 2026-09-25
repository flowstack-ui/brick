import { createElement, createRef } from "react";
import { Slider, useSlider, type SliderFrame, type SliderRootProps, type SliderSize, type SliderTone, type SliderVariant } from "../../../src/slider.js";
import { Slider as RootSlider } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>(); const sizes: SliderSize[] = ["sm", "md", "lg"]; const variants: SliderVariant[] = ["outline", "solid", "soft"]; const tones: SliderTone[] = ["neutral", "accent", "contrast"]; const frames: SliderFrame[] = ["none", "outline", "panel", "inline"]; const props: SliderRootProps = { defaultValue: [20, 80], frame: "outline", size: { initial: "sm", md: "lg" }, tone: "neutral", variant: "soft" };
createElement(Slider.Root, { ...props, ref, "aria-label": "Range" }, createElement(Slider.Control, null, createElement(Slider.Track, null, createElement(Slider.Range)), createElement(Slider.Thumb, { index: 0 }, createElement(Slider.ValueLabel)), createElement(Slider.MarkerGroup, null, createElement(Slider.Marker, { value: 50 }, createElement(Slider.MarkerIndicator), createElement(Slider.MarkerLabel, null, "Mid")))));
createElement(RootSlider.Root, { "aria-label": "Level" });
function Controlled() { const slider = useSlider({ defaultValue: [25] }); return createElement(Slider.RootProvider, { value: slider }, createElement(Slider.Thumbs)); }
// @ts-expect-error closed size
createElement(Slider.Root, { size: "xl" });
// @ts-expect-error Marker requires value
createElement(Slider.Marker, {});
void Controlled; void sizes; void variants; void tones; void frames;
