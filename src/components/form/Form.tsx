import { forwardRef, type ReactElement, type ReactNode } from "react";
import {
  Form as AtomForm,
  type FormRootProps as AtomFormRootProps,
} from "@flowstack-ui/atom/form";

type FormSharedProps = Omit<
  AtomFormRootProps,
  "asChild" | "children" | "render"
>;

export type FormProps = FormSharedProps &
  (
    | {
        asChild: true;
        render?: never;
        children: ReactElement;
      }
    | {
        asChild?: false;
        render?: AtomFormRootProps["render"];
        children?: ReactNode;
      }
  );

function mergeClassName(className: string | undefined) {
  return className ? `brick-form ${className}` : "brick-form";
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot = "form",
    ...props
  },
  ref,
) {
  return (
    <AtomForm.Root
      {...props}
      asChild={asChild}
      className={mergeClassName(className)}
      data-slot={dataSlot}
      ref={ref}
      render={render}
    >
      {children}
    </AtomForm.Root>
  );
});

Form.displayName = "Form";
