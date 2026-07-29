import { createElement, createRef } from "react";
import { Slider, type SliderRootProps, type SliderSize, type SliderVariant } from "../../../src/slider.js";
import { Slider as RootSlider } from "../../../src/index.js";
const ref = createRef<HTMLDivElement>(); const sizes: SliderSize[] = ["sm", "md", "lg"]; const variants: SliderVariant[] = ["solid", "soft"]; const props: SliderRootProps = { defaultValue: [20, 80], size: "lg", variant: "soft" };
createElement(Slider.Root, { ...props, ref, "aria-label": "Range" }, createElement(Slider.Track, null, createElement(Slider.Range), createElement(Slider.Thumb, { index: 0 }, createElement(Slider.ValueLabel)), createElement(Slider.Marker, { value: 50 })));
createElement(RootSlider.Root, { "aria-label": "Level" });
// @ts-expect-error closed size
createElement(Slider.Root, { size: "xl" });
// @ts-expect-error Marker requires value
createElement(Slider.Marker, {});
void sizes; void variants;
