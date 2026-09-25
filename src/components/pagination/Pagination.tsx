"use client";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  Pagination as AtomPagination,
  usePaginationContext,
  type PaginationRootProps as AtomRootProps,
  type PaginationRootProviderProps as AtomProviderProps,
  type PaginationControlProps,
  type PaginationItemProps as AtomItemProps,
  type PaginationItemsProps as AtomItemsProps,
  type PaginationEllipsisProps as AtomEllipsisProps,
  type PaginationListProps as AtomListProps,
} from "@flowstack-ui/atom/pagination";
import {
  buttonPresentation as sharedButtonPresentation,
  type ButtonVisualProps,
  type ButtonVariant,
  type ButtonSize,
} from "../button/Button.js";
import { useButtonGroupDefaults } from "../button/ButtonGroup.js";
import { Text } from "../text/Text.js";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";

export type PaginationVariant = ButtonVariant;
function buttonPresentation(props: ButtonVisualProps, className?: string) {
  return sharedButtonPresentation(props, className, "md");
}
export type PaginationSize = ButtonSize;
export type PaginationBoundaryVariant = "plain" | "outline";
interface PaginationVisualProps
  extends Pick<
    ButtonVisualProps,
    "size" | "variant" | "tone" | "radius" | "focusRing"
  > {
  selectedVariant?: ButtonVariant;
  /** Legacy boundary override. Prefer explicit control variant. */
  boundaryVariant?: PaginationBoundaryVariant;
}
export type PaginationRootProps = AtomRootProps & PaginationVisualProps;
export type PaginationRootProviderProps = AtomProviderProps &
  PaginationVisualProps;
export type PaginationListProps = AtomListProps;
export type PaginationItemProps = AtomItemProps & PaginationVisualProps;
export type PaginationPreviousProps = PaginationControlProps &
  PaginationVisualProps;
export type PaginationNextProps = PaginationPreviousProps;
export type PaginationFirstProps = PaginationPreviousProps;
export type PaginationLastProps = PaginationPreviousProps;
export type PaginationItemsProps = AtomItemsProps;
export type PaginationEllipsisProps = AtomEllipsisProps;

const VisualContext = createContext<PaginationVisualProps>({});
function useVisual(own: PaginationVisualProps = {}) {
  const root = useContext(VisualContext);
  const group = useButtonGroupDefaults();
  return {
    variant: own.variant ?? root.variant ?? group.variant ?? "ghost",
    selectedVariant: own.selectedVariant ?? root.selectedVariant ?? "outline",
    tone: own.tone ?? root.tone ?? group.tone ?? "neutral",
    size: own.size ?? root.size ?? group.size ?? "md",
    radius: own.radius ?? root.radius ?? group.radius,
    focusRing: own.focusRing ?? root.focusRing ?? group.focusRing ?? "inside",
    boundaryVariant: own.boundaryVariant ?? root.boundaryVariant,
  } as const;
}
function classes(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  function PaginationRoot(
    {
      variant,
      selectedVariant,
      boundaryVariant,
      tone,
      size,
      radius,
      focusRing,
      className,
      ...props
    },
    ref,
  ) {
    return (
      <VisualContext.Provider
        value={{
          variant,
          selectedVariant,
          boundaryVariant,
          tone,
          size,
          radius,
          focusRing,
        }}
      >
        <AtomPagination.Root
          {...props}
          className={classes("brick-pagination", className)}
          data-slot="pagination"
          ref={ref}
        />
      </VisualContext.Provider>
    );
  },
);
export const PaginationRootProvider = forwardRef<
  HTMLElement,
  PaginationRootProviderProps
>(function PaginationRootProvider(
  {
    variant,
    selectedVariant,
    boundaryVariant,
    tone,
    size,
    radius,
    focusRing,
    className,
    ...props
  },
  ref,
) {
  return (
    <VisualContext.Provider
      value={{
        variant,
        selectedVariant,
        boundaryVariant,
        tone,
        size,
        radius,
        focusRing,
      }}
    >
      <AtomPagination.RootProvider
        {...props}
        className={classes("brick-pagination", className)}
        data-slot="pagination"
        ref={ref}
      />
    </VisualContext.Provider>
  );
});
export const PaginationList = forwardRef<HTMLOListElement, PaginationListProps>(
  function PaginationList({ className, ...props }, ref) {
    const { disabled } = usePaginationContext();
    return (
      <AtomPagination.List
        tabIndex={disabled ? 0 : undefined}
        {...props}
        className={classes("brick-pagination__list", className)}
        ref={ref}
      />
    );
  },
);

function DirectionIcon({
  backward,
  boundary,
}: {
  backward: boolean;
  boundary: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className="brick-pagination__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={backward ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      {boundary ? <path d={backward ? "M5 5v14" : "M19 5v14"} /> : null}
    </svg>
  );
}
function createControl(part: "Previous" | "Next" | "First" | "Last") {
  const AtomControl = AtomPagination[part];
  return forwardRef<HTMLElement, PaginationPreviousProps>(
    function PaginationControl(
      {
        variant,
        selectedVariant,
        boundaryVariant,
        tone,
        size,
        radius,
        focusRing,
        className,
        style,
        children,
        ...props
      },
      ref,
    ) {
      const visual = useVisual({
        variant,
        selectedVariant,
        boundaryVariant,
        tone,
        size,
        radius,
        focusRing,
      });
      const presentation = buttonPresentation(
        {
          ...visual,
          variant:
            variant ??
            (visual.boundaryVariant === "outline" ? "outline" : visual.variant),
        },
        classes(`brick-pagination__${part.toLowerCase()}`, className),
      );
      return (
        <AtomControl
          {...props}
          {...presentation}
          style={{ ...presentation.style, ...style }}
          ref={ref}
        >
          {children ?? (
            <DirectionIcon
              backward={part === "Previous" || part === "First"}
              boundary={part === "First" || part === "Last"}
            />
          )}
        </AtomControl>
      );
    },
  );
}
export const PaginationPrevious = createControl("Previous");
export const PaginationNext = createControl("Next");
export const PaginationFirst = createControl("First");
export const PaginationLast = createControl("Last");

export const PaginationItem = forwardRef<HTMLElement, PaginationItemProps>(
  function PaginationItem(
    {
      variant,
      selectedVariant,
      boundaryVariant,
      tone,
      size,
      radius,
      focusRing,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) {
    const visual = useVisual({
      variant,
      selectedVariant,
      boundaryVariant,
      tone,
      size,
      radius,
      focusRing,
    });
    const state = usePaginationContext();
    const { locale } = useLocaleContext();
    const presentation = buttonPresentation(
      {
        ...visual,
        variant:
          state.currentPage === props.page
            ? visual.selectedVariant
            : visual.variant,
      },
      classes("brick-pagination__item", className),
    );
    return (
      <AtomPagination.Item
        {...props}
        {...presentation}
        style={{ ...presentation.style, ...style }}
        ref={ref}
      >
        {children ?? new Intl.NumberFormat(locale).format(props.page)}
      </AtomPagination.Item>
    );
  },
);

export function PaginationItems({
  render,
  itemProps,
  ellipsisProps,
  ellipsis,
}: PaginationItemsProps) {
  const visual = useVisual();
  const state = usePaginationContext();
  const { locale } = useLocaleContext();
  const Host = state.getPageHref ? "a" : "button";
  return (
    <AtomPagination.Items
      itemProps={itemProps}
      ellipsisProps={{
        ...buttonPresentation(
          { ...visual, variant: "plain" },
          "brick-pagination__ellipsis",
        ),
        ...ellipsisProps,
      }}
      ellipsis={ellipsis}
      render={
        render ??
        (({ page, isCurrent }) => (
          <Host
            {...buttonPresentation(
              {
                ...visual,
                variant: isCurrent ? visual.selectedVariant : visual.variant,
              },
              "brick-pagination__item",
            )}
          >
            {new Intl.NumberFormat(locale).format(page)}
          </Host>
        ))
      }
    />
  );
}
export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  PaginationEllipsisProps
>(function PaginationEllipsis({ className, style, ...props }, ref) {
  const visual = useVisual();
  const presentation = buttonPresentation(
    { ...visual, variant: "plain" },
    classes("brick-pagination__ellipsis", className),
  );
  return (
    <AtomPagination.Ellipsis
      {...props}
      {...presentation}
      style={{ ...presentation.style, ...style }}
      ref={ref}
    />
  );
});

export interface PaginationPageTextFormatDetails {
  page: number;
  totalPages: number;
  count?: number;
  pageRange?: { start: number; end: number };
  formatNumber: (value: number) => string;
}
export type PaginationPageTextProps = Omit<
  ComponentProps<typeof Text>,
  "children" | "truncate" | "lineClamp"
> & {
  format?:
    | "short"
    | "compact"
    | "long"
    | ((details: PaginationPageTextFormatDetails) => ReactNode);
};
export const PaginationPageText = forwardRef<
  HTMLElement,
  PaginationPageTextProps
>(function PaginationPageText({ format = "compact", ...props }, ref) {
  const state = usePaginationContext();
  const { locale } = useLocaleContext();
  const formatNumber = (value: number) =>
    new Intl.NumberFormat(locale).format(value);
  const details = {
    page: state.page,
    totalPages: state.totalPages,
    count: state.count,
    pageRange: state.pageRange,
    formatNumber,
  };
  if (format === "long" && !state.pageRange)
    throw new Error("Pagination.PageText long format requires count mode.");
  const content =
    typeof format === "function"
      ? format(details)
      : format === "short"
        ? `${formatNumber(state.page)} / ${formatNumber(state.totalPages)}`
        : format === "long"
          ? `${formatNumber(state.count === 0 ? 0 : state.pageRange!.start + 1)} – ${formatNumber(state.pageRange!.end)} of ${formatNumber(state.count!)}`
          : `${formatNumber(state.page)} of ${formatNumber(state.totalPages)}`;
  return (
    <Text variant="body-sm" {...props} ref={ref}>
      {content}
    </Text>
  );
});

export {
  usePagination,
  usePaginationContext,
  type UsePaginationProps,
  type UsePaginationReturn,
  type PaginationIds,
} from "@flowstack-ui/atom/pagination";
export const Pagination = Object.freeze({
  Root: PaginationRoot,
  RootProvider: PaginationRootProvider,
  Context: AtomPagination.Context,
  List: PaginationList,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  First: PaginationFirst,
  Last: PaginationLast,
  Items: PaginationItems,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  PageText: PaginationPageText,
});
