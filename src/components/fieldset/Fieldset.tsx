import {
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { layoutHost } from "../_internal/layout-host.js";
import {
  responsiveSpacingStyles,
  type SpacingValue,
} from "../_spacing-value/SpacingValue.js";
import {
  responsiveDataAttributes,
  type ResponsiveValue,
} from "../_responsive-value/ResponsiveValue.js";
import {
  Fieldset as AtomFieldset,
  markFieldsetPart,
  useFieldsetContext,
  type FieldsetDescriptionProps as AtomFieldsetDescriptionProps,
  type FieldsetErrorProps as AtomFieldsetErrorProps,
  type FieldsetLegendProps as AtomFieldsetLegendProps,
  type FieldsetRootProps as AtomFieldsetRootProps,
} from "@flowstack-ui/atom/fieldset";

type ComposedRequiredProps<T> = Omit<T, "asChild" | "children" | "render"> &
  (
    | { asChild: true; render?: never; children: ReactElement }
    | {
        asChild?: false;
        render?: T extends { render?: infer R } ? R : never;
        children: ReactNode;
      }
  );

export type FieldsetSize = "sm" | "md" | "lg";
export type FieldsetRootProps = ComposedRequiredProps<AtomFieldsetRootProps> & {
  size?: ResponsiveValue<FieldsetSize>;
};
export type FieldsetLegendProps =
  ComposedRequiredProps<AtomFieldsetLegendProps>;
export type FieldsetDescriptionProps =
  ComposedRequiredProps<AtomFieldsetDescriptionProps>;
export type FieldsetErrorProps = ComposedRequiredProps<AtomFieldsetErrorProps>;

function mergeClassName(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slotOrDefault(slot: string | undefined, fallback: string) {
  return slot ?? fallback;
}

export const FieldsetRoot = forwardRef<HTMLFieldSetElement, FieldsetRootProps>(
  function FieldsetRoot(
    {
      asChild = false,
      children,
      className,
      size = "md",
      render,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    return (
      <AtomFieldset.Root
        {...props}
        {...responsiveDataAttributes("data-size", size, {
          alwaysInitial: true,
          defaultValue: "md",
        })}
        asChild={asChild}
        className={mergeClassName("brick-fieldset", className)}
        data-slot={slotOrDefault(dataSlot, "fieldset")}
        ref={ref}
        render={render}
      >
        {children}
      </AtomFieldset.Root>
    );
  },
);

export const FieldsetLegend = forwardRef<
  HTMLLegendElement,
  FieldsetLegendProps
>(function FieldsetLegend(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomFieldset.Legend
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-fieldset-legend", className)}
      data-slot={slotOrDefault(dataSlot, "fieldset-legend")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomFieldset.Legend>
  );
});

export const FieldsetDescription = forwardRef<
  HTMLParagraphElement,
  FieldsetDescriptionProps
>(function FieldsetDescription(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomFieldset.Description
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-fieldset-description", className)}
      data-slot={slotOrDefault(dataSlot, "fieldset-description")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomFieldset.Description>
  );
});

export const FieldsetError = forwardRef<
  HTMLParagraphElement,
  FieldsetErrorProps
>(function FieldsetError(
  {
    asChild = false,
    children,
    className,
    render,
    "data-slot": dataSlot,
    ...props
  },
  ref,
) {
  return (
    <AtomFieldset.Error
      {...props}
      asChild={asChild}
      className={mergeClassName("brick-fieldset-error", className)}
      data-slot={slotOrDefault(dataSlot, "fieldset-error")}
      ref={ref}
      render={render}
    >
      {children}
    </AtomFieldset.Error>
  );
});

markFieldsetPart(FieldsetLegend, "legend");
export type FieldsetContentProps = HTMLAttributes<HTMLDivElement> & {
  gap?: ResponsiveValue<SpacingValue>;
} & (
    | { asChild: true; children: ReactElement }
    | { asChild?: false; children?: ReactNode }
  );
export const FieldsetContent = forwardRef<HTMLDivElement, FieldsetContentProps>(
  function FieldsetContent(
    { className, children, asChild, gap, style, ...props },
    ref,
  ) {
    const host = {
      ...props,
      "data-slot": "fieldset-content",
      className: mergeClassName("brick-fieldset-content", className),
      style: {
        ...(gap === undefined
          ? {}
          : responsiveSpacingStyles("--brick-fieldset-content-gap", gap)),
        ...style,
      },
    };
    return asChild ? (
      layoutHost(children, host, ref, "Fieldset.Content")
    ) : (
      <div {...host} ref={ref}>
        {children}
      </div>
    );
  },
);
export const FieldsetContext = AtomFieldset.Context;
export { useFieldsetContext };
markFieldsetPart(FieldsetDescription, "description");
markFieldsetPart(FieldsetError, "error");

FieldsetRoot.displayName = "Fieldset.Root";
FieldsetLegend.displayName = "Fieldset.Legend";
FieldsetDescription.displayName = "Fieldset.Description";
FieldsetError.displayName = "Fieldset.Error";

export const Fieldset = Object.freeze({
  Content: FieldsetContent,
  Context: AtomFieldset.Context,
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
  Description: FieldsetDescription,
  Error: FieldsetError,
});
