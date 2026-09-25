import {
  forwardRef,
  createContext,
  useContext,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Toast as AtomToast,
  createToastApi,
  createToastStore,
  defaultToastStore,
  type ToastStore,
  type ToastStatusChangeDetails,
  type ToastActionProps as AtomToastActionProps,
  type ToastCloseProps as AtomToastCloseProps,
  type ToastData as AtomToastData,
  type ToastDescriptionProps as AtomToastDescriptionProps,
  type ToastId,
  type ToastRootProps as AtomToastRootProps,
  type ToastTitleProps as AtomToastTitleProps,
  type ToastSwipeDirection,
} from "@flowstack-ui/atom/toast";
import { useLocaleContext } from "../locale-provider/LocaleProvider.js";
import { radiusStyle, type Radius } from "../_radius/Radius.js";
import { responsiveSpacingStyles, type SpacingValue } from "../_spacing-value/SpacingValue.js";
import type { ResponsiveValue } from "../_responsive-value/ResponsiveValue.js";
import { Spinner } from "../spinner/Spinner.js";

export type { ToastId, ToastSwipeDirection, ToastStatusChangeDetails };
export type ToastVariant = "surface" | "solid";
export type ToastTone = "neutral" | "contrast" | "accent" | "success" | "danger" | "warning" | "info";
export interface ToastPresentationProps { variant?: ToastVariant; tone?: ToastTone; radius?: Radius; }
const ToastTypeContext = createContext<ToastType>("default");

export type ToastType =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

export type ToastPosition =
  | "top-start"
  | "top-center"
  | "top-end"
  | "bottom-start"
  | "bottom-center"
  | "bottom-end";

export type ToastWidth = "responsive" | "compact" | "full";
export type ToastStacking = "separated" | "overlap";

export interface ToastActionData {
  label: string;
  onClick: () => void;
}

export interface ToastOptions extends ToastPresentationProps {
  removeDelay?: number;
  onStatusChange?: (details: ToastStatusChangeDetails) => void;
  meta?: Record<string, unknown>;
  id?: ToastId;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  icon?: ReactNode;
  action?: ToastActionData;
  closeButton?: boolean;
  dismissible?: boolean;
  onDismiss?: (id: ToastId) => void;
  onAutoClose?: (id: ToastId) => void;
  className?: string;
}

export type ToastUpdateOptions = Partial<Omit<ToastOptions, "id">>;

export interface ToastPromiseOptions<T> {
  loading: string | Omit<ToastOptions, "type" | "duration">;
  success:
    | string
    | ((value: T) => string | Omit<ToastOptions, "type">);
  error:
    | string
    | ((error: unknown) => string | Omit<ToastOptions, "type">);
}

export interface ToastApi {
  (message: string, options?: Omit<ToastOptions, "title">): ToastId;
  (options: ToastOptions): ToastId;
  success(message: string, options?: Omit<ToastOptions, "title" | "type">): ToastId;
  error(message: string, options?: Omit<ToastOptions, "title" | "type">): ToastId;
  warning(message: string, options?: Omit<ToastOptions, "title" | "type">): ToastId;
  info(message: string, options?: Omit<ToastOptions, "title" | "type">): ToastId;
  loading(message: string, options?: Omit<ToastOptions, "title" | "type">): ToastId;
  promise<T>(promise: Promise<T> | (() => Promise<T>), options: ToastPromiseOptions<T>): Promise<T>;
  track<T>(promise: Promise<T> | (() => Promise<T>), options: ToastPromiseOptions<T>): { id: ToastId; unwrap(): Promise<T> };
  pause(id?: ToastId): void;
  resume(id?: ToastId): void;
  remove(id?: ToastId): void;
  isVisible(id: ToastId): boolean;
  isDismissed(id: ToastId): boolean;
  getCount(): number;
  getVisibleToasts(): ToastData[];
  subscribe(listener: () => void): () => void;
  expand(): void;
  collapse(): void;
  readonly store: ToastStore;
  dismiss(id?: ToastId): void;
  update(id: ToastId, options: ToastUpdateOptions): void;
}

function warnForMissingMessage(options: ToastOptions) {
  if (options.title === undefined && options.description === undefined) {
    console.warn("[Brick Toast] Provide at least a title or description.");
  }
}

function bindToast(store: ToastStore): ToastApi {
  const api = createToastApi(store);
  const create = ((message: string | ToastOptions, options?: Omit<ToastOptions, "title">) => {
    const resolved = typeof message === "string" ? { ...options, title: message } : message;
    warnForMissingMessage(resolved);
    return api(resolved);
  }) as ToastApi;
  return Object.assign(create, api, { subscribe: store.subscribe }) as ToastApi;
}

/** Create once per application scope, or per server request; mount one Toaster per instance. */
export function createToaster(options: { duration?: number; removeDelay?: number } = {}): ToastApi {
  return bindToast(createToastStore(options));
}
export const toast = bindToast(defaultToastStore);

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export type ToastRootProps = Omit<AtomToastRootProps, "type"> & ToastPresentationProps & {
  type?: ToastType;
};

export const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(function ToastRoot(
  { className, style, variant, tone, radius, "data-slot": slot, ...props },
  ref,
) {
  const record = props.toast as (ToastData | undefined);
  const type = props.type ?? record?.type ?? "default";
  return (
    <ToastTypeContext.Provider value={type}>
    <AtomToast.Root
      {...props}
      className={classes("brick-toast", className)}
      data-slot={slot ?? "toast"}
      data-variant={variant ?? record?.variant ?? "surface"}
      data-tone={tone ?? record?.tone}
      style={radiusStyle(radius ?? record?.radius, "--brick-toast-radius", style)}
      ref={ref}
    />
    </ToastTypeContext.Provider>
  );
});

export interface ToastIconProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  type?: ToastType;
  "data-slot"?: string;
}

function StatusGlyph({ type }: { type: ToastType }) {
  if (type === "loading") return <Spinner size="sm" className="brick-toast__spinner" />;
  if (type === "default") return null;
  const paths: Record<Exclude<ToastType, "default" | "loading">, ReactNode> = {
    success: <path d="m5 12 4 4 10-10" />,
    error: <><path d="M12 8v5" /><path d="M12 17h.01" /><circle cx="12" cy="12" r="9" /></>,
    warning: <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 4.8 3.2 17a2 2 0 0 0 1.7 3h14.2a2 2 0 0 0 1.7-3L13.7 4.8a2 2 0 0 0-3.4 0Z" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7h.01" /></>,
  };
  return <svg viewBox="0 0 24 24">{paths[type]}</svg>;
}

export const ToastIcon = forwardRef<HTMLSpanElement, ToastIconProps>(function ToastIcon(
  { children, className, type, "data-slot": slot, ...props },
  ref,
) {
  const inheritedType = useContext(ToastTypeContext);
  const content = children ?? <StatusGlyph type={type ?? inheritedType} />;
  if (content === null) return null;
  return (
    <span
      {...props}
      aria-hidden="true"
      className={classes("brick-toast__icon", className)}
      data-slot={slot ?? "toast-icon"}
      ref={ref}
    >
      {content}
    </span>
  );
});

export interface ToastContentProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}

export const ToastContent = forwardRef<HTMLDivElement, ToastContentProps>(function ToastContent(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <div {...props} className={classes("brick-toast__content", className)} data-slot={slot ?? "toast-content"} ref={ref} />;
});

export type ToastTitleProps = AtomToastTitleProps;
export const ToastTitle = forwardRef<HTMLParagraphElement, ToastTitleProps>(function ToastTitle(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomToast.Title {...props} className={classes("brick-toast__title", className)} data-slot={slot ?? "toast-title"} ref={ref} />;
});

export type ToastDescriptionProps = AtomToastDescriptionProps;
export const ToastDescription = forwardRef<HTMLParagraphElement, ToastDescriptionProps>(function ToastDescription(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomToast.Description {...props} className={classes("brick-toast__description", className)} data-slot={slot ?? "toast-description"} ref={ref} />;
});

export interface ToastActionsProps extends HTMLAttributes<HTMLDivElement> {
  "data-slot"?: string;
}
export const ToastActions = forwardRef<HTMLDivElement, ToastActionsProps>(function ToastActions(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <div {...props} className={classes("brick-toast__actions", className)} data-slot={slot ?? "toast-actions"} ref={ref} />;
});

export type ToastActionProps = AtomToastActionProps;
export const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { className, "data-slot": slot, ...props },
  ref,
) {
  return <AtomToast.Action {...props} className={classes("brick-toast__action", className)} data-slot={slot ?? "toast-action"} ref={ref} />;
});

export type ToastCloseProps = AtomToastCloseProps;
export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { children, className, "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomToast.Close {...props} className={classes("brick-toast__close", className)} data-slot={slot ?? "toast-close"} ref={ref}>
      {children ?? <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17" /></svg>}
    </AtomToast.Close>
  );
});

export interface ToastSpacingProps {
  gap?: ResponsiveValue<SpacingValue>;
  offset?: ResponsiveValue<SpacingValue>;
  offsetBlockStart?: ResponsiveValue<SpacingValue>;
  offsetBlockEnd?: ResponsiveValue<SpacingValue>;
  offsetInlineStart?: ResponsiveValue<SpacingValue>;
  offsetInlineEnd?: ResponsiveValue<SpacingValue>;
}

export interface ToastViewportProps extends ToastSpacingProps, Omit<
  ComponentProps<typeof AtomToast.Viewport>,
  "position"
> {
  position?: ToastPosition;
  width?: ToastWidth;
  stacking?: ToastStacking;
}

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
  { className, style, gap, offset, offsetBlockStart = offset, offsetBlockEnd = offset, offsetInlineStart = offset, offsetInlineEnd = offset, position = "bottom-end", stacking = "separated", width = "responsive", "data-slot": slot, ...props },
  ref,
) {
  return (
    <AtomToast.Viewport
      {...props}
      className={classes("brick-toast-viewport", className)}
      data-slot={slot ?? "toast-viewport"}
      data-stacking={stacking}
      data-width={width}
      style={{
        ...(gap !== undefined && responsiveSpacingStyles("--brick-toast-viewport-gap", gap)),
        ...(offsetBlockStart !== undefined && responsiveSpacingStyles("--brick-toast-offset-block-start", offsetBlockStart)),
        ...(offsetBlockEnd !== undefined && responsiveSpacingStyles("--brick-toast-offset-block-end", offsetBlockEnd)),
        ...(offsetInlineStart !== undefined && responsiveSpacingStyles("--brick-toast-offset-inline-start", offsetInlineStart)),
        ...(offsetInlineEnd !== undefined && responsiveSpacingStyles("--brick-toast-offset-inline-end", offsetInlineEnd)),
        ...style,
      }}
      position={position}
      ref={ref}
    />
  );
});

export interface ToastData extends ToastPresentationProps, Omit<AtomToastData, "title" | "description" | "type" | "action" | "cancel"> {
  title?: string;
  description?: string;
  type: ToastType;
  action?: ToastActionData;
}

export interface ToastRenderState {
  toast: ToastData;
  index: number;
  expanded: boolean;
}

export interface ToasterProps extends ToastPresentationProps, ToastSpacingProps, Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "children" | "role" | "tabIndex" | "onKeyDown"
> {
  toaster?: ToastApi;
  position?: ToastPosition;
  maxVisible?: number;
  closeButton?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  pauseOnFocusLoss?: boolean;
  hotkey?: readonly string[];
  label?: string;
  closeLabel?: string;
  width?: ToastWidth;
  stacking?: ToastStacking;
  swipeDirection?: ToastSwipeDirection;
  swipeThreshold?: number;
  renderToast?: (state: ToastRenderState) => ReactNode;
  container?: HTMLElement | null;
  portalDisabled?: boolean;
  "data-slot"?: string;
}

function DefaultToast({ closeLabel, state, ...presentation }: ToastPresentationProps & { closeLabel: string; state: ToastRenderState }) {
  const { toast: item, index, expanded } = state;
  const hasIcon = item.icon != null || item.type !== "default";
  return (
    <ToastRoot {...presentation} variant={item.variant ?? presentation.variant} tone={item.tone ?? presentation.tone} radius={item.radius ?? presentation.radius} key={item.id} toast={item as AtomToastData} index={index} expanded={expanded}>
      {hasIcon ? (
        <ToastIcon type={item.type}>{item.icon ?? <StatusGlyph type={item.type} />}</ToastIcon>
      ) : null}
      <ToastContent>
        <ToastTitle />
        <ToastDescription />
      </ToastContent>
      {item.action ? <ToastActions><ToastAction /></ToastActions> : null}
      <ToastClose aria-label={closeLabel} />
    </ToastRoot>
  );
}

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(function Toaster(
  {
    toaster = toast,
    variant,
    tone,
    radius,
    position = "bottom-end",
    maxVisible = 3,
    closeButton = true,
    pauseOnHover = true,
    pauseOnFocus = true,
    pauseOnFocusLoss = true,
    hotkey = ["F8"],
    label,
    closeLabel,
    width = "responsive",
    stacking = "separated",
    swipeDirection,
    swipeThreshold = 50,
    renderToast,
    container,
    portalDisabled,
    ...viewportProps
  },
  ref,
) {
  const { localeText } = useLocaleContext();
  const resolvedLabel = label ?? localeText.notifications;
  const resolvedCloseLabel = closeLabel ?? localeText.closeNotification;
  return (
    <AtomToast.Provider
      store={toaster.store}
      closeButton={closeButton}
      expandOnHover={stacking === "overlap"}
      hotkey={hotkey}
      label={resolvedLabel}
      maxVisible={maxVisible}
      pauseOnFocus={pauseOnFocus}
      pauseOnFocusLoss={pauseOnFocusLoss}
      pauseOnHover={pauseOnHover}
      swipeDirection={swipeDirection}
      swipeThreshold={swipeThreshold}
    >
      <ToastViewport
        {...viewportProps}
        container={container}
        portalDisabled={portalDisabled}
        position={position}
        ref={ref}
        stacking={stacking}
        width={width}
        renderToast={(atomState) => {
          const state = atomState as ToastRenderState;
          return renderToast ? renderToast(state) : <DefaultToast variant={variant} tone={tone} radius={radius} closeLabel={resolvedCloseLabel} state={state} />;
        }}
      />
    </AtomToast.Provider>
  );
});

ToastRoot.displayName = "Toast.Root";
ToastIcon.displayName = "Toast.Icon";
ToastContent.displayName = "Toast.Content";
ToastTitle.displayName = "Toast.Title";
ToastDescription.displayName = "Toast.Description";
ToastActions.displayName = "Toast.Actions";
ToastAction.displayName = "Toast.Action";
ToastClose.displayName = "Toast.Close";
ToastViewport.displayName = "Toast.Viewport";
Toaster.displayName = "Toaster";

export const Toast = Object.freeze({
  Root: ToastRoot,
  Icon: ToastIcon,
  Content: ToastContent,
  Title: ToastTitle,
  Description: ToastDescription,
  Actions: ToastActions,
  Action: ToastAction,
  Close: ToastClose,
  Viewport: ToastViewport,
});
