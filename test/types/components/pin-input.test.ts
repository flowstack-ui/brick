import {createElement,createRef} from "react";import {PinInput,type PinInputLayout,type PinInputRootProps,type PinInputShape,type PinInputSize,type PinInputVariant} from "../../../src/pin-input.js";const rootRef=createRef<HTMLDivElement>();const inputRef=createRef<HTMLInputElement>();const props:PinInputRootProps={children:null,length:6,type:"numeric",layout:"separated",size:{md:"sm",xl:"2xl"},getInputLabel:(index,length)=>`Digit ${index+1} of ${length}`};createElement(PinInput.Root,{...props,ref:rootRef},createElement(PinInput.Group,null,createElement(PinInput.Input,{index:0,ref:inputRef})));const layouts:PinInputLayout[]=["separated","attached"];const variants:PinInputVariant[]=["outline", "soft","underline", "surface"];const sizes:PinInputSize[]=["2xs","xs","sm","md","lg","xl","2xl"];const shapes:PinInputShape[]=["sharp","rounded"];// @ts-expect-error underline has fixed geometry
createElement(PinInput.Root,{children:null,variant:"underline",shape:"rounded"});void layouts;void variants;void sizes;void shapes;
// @ts-expect-error array state must preserve empty positions
createElement(PinInput.Root,{children:null,value:"1234"});
const advanced:PinInputRootProps={children:null,otp:true,mask:true,placeholder:"_",selectOnFocus:false,blurOnComplete:true,defaultValue:["0","","2"],sanitizeValue:value=>value.trim(),onValueChange:({value,valueAsString,complete})=>{void value;void valueAsString;void complete;},onValueInvalid:({reason})=>void reason};
void advanced;

const surfaceRecipe: Pick<import("react").ComponentProps<typeof PinInput.Root>, "variant"> = { variant: "surface" };
void surfaceRecipe;
const responsiveRecipe: PinInputRootProps = { children:null, variant:{initial:"underline",md:"subtle",lg:"plain"}, tone:"neutral" };
void responsiveRecipe;
// @ts-expect-error responsive underline can never accept explicit corners
createElement(PinInput.Root,{children:null,variant:{md:"underline"},radius:"full"});
// @ts-expect-error state is not a tone
createElement(PinInput.Root,{children:null,tone:"danger"});
