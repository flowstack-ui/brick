import { createElement, createRef } from "react";
import { CheckboxCard, type CheckboxCardRootProps } from "../../../src/checkbox-card.js";
import { CheckboxCard as RootCard } from "../../../src/index.js";
const props: CheckboxCardRootProps = { size: {initial:"sm",md:"lg"}, variant:"surface", tone:"contrast", radius:"none", defaultChecked:"indeterminate" };
createElement(CheckboxCard.Root,{...props,ref:createRef<HTMLLabelElement>()});
createElement(RootCard.HiddenInput,{ref:createRef<HTMLInputElement>()});
// @ts-expect-error unsupported card size
createElement(CheckboxCard.Root,{size:"xl"});
// @ts-expect-error selection is not a string value
createElement(CheckboxCard.Root,{checked:"yes"});
// @ts-expect-error input state is owned by Root
createElement(CheckboxCard.HiddenInput,{checked:true});
