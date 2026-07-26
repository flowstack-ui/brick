import {
  Clipboard as AtomClipboard,
  type ClipboardIndicatorProps as AtomClipboardIndicatorProps,
  type ClipboardRootProps as AtomClipboardRootProps,
  type ClipboardStatusProps as AtomClipboardStatusProps,
  type ClipboardTriggerProps as AtomClipboardTriggerProps,
} from "@flowstack-ui/atom/clipboard";
import {
  forwardRef,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Button, type ButtonProps } from "../button/index.js";
import { Code } from "../code/index.js";
import { ScrollArea } from "../scroll-area/index.js";
import { CodeBlockContext, useCodeBlockContext } from "./context.js";

export type CodeBlockVariant = "subtle" | "bordered" | "plain";
export type CodeBlockSize = "sm" | "md";
export type CodeBlockWrap = "scroll" | "wrap";

export interface CodeBlockRootProps extends Omit<AtomClipboardRootProps, "dangerouslySetInnerHTML" | "defaultValue" | "value"> {
  value: string;
  language?: string;
  variant?: CodeBlockVariant;
  size?: CodeBlockSize;
}

type SlottedProps<T> = T & { "data-slot"?: string };

export type CodeBlockHeaderProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export type CodeBlockTitleProps = SlottedProps<HTMLAttributes<HTMLSpanElement>>;
export interface CodeBlockLanguageProps extends SlottedProps<HTMLAttributes<HTMLSpanElement>> {
  children?: ReactNode;
}
export type CodeBlockActionsProps = SlottedProps<HTMLAttributes<HTMLDivElement>>;
export interface CodeBlockContentProps extends Omit<SlottedProps<HTMLAttributes<HTMLDivElement>>, "dangerouslySetInnerHTML"> {
  children?: ReactNode;
  wrap?: CodeBlockWrap;
  focusable?: boolean;
}
export type CodeBlockCopyTriggerProps = Omit<AtomClipboardTriggerProps, "asChild" | "render"> &
  Pick<ButtonProps, "variant" | "tone" | "size" | "shape" | "startIcon" | "endIcon">;
export type CodeBlockCopyIndicatorProps = AtomClipboardIndicatorProps;
export type CodeBlockCopyStatusProps = AtomClipboardStatusProps;

function classes(base: string, className: string | undefined) {
  return className ? `${base} ${className}` : base;
}

function slot(value: string | undefined, fallback: string) {
  return value ?? fallback;
}

function languageClass(language: string | undefined) {
  return language && /^[A-Za-z0-9_+-]+$/.test(language)
    ? `language-${language.toLowerCase()}`
    : undefined;
}

export const CodeBlockRoot = forwardRef<HTMLDivElement, CodeBlockRootProps>(
  function CodeBlockRoot(
    {
      value,
      language,
      variant = "subtle",
      size = "md",
      className,
      children,
      "data-slot": dataSlot,
      ...props
    },
    ref,
  ) {
    const context = useMemo(
      () => ({ value, language, variant, size }),
      [language, size, value, variant],
    );
    return (
      <CodeBlockContext.Provider value={context}>
        <AtomClipboard.Root
          {...props}
          className={classes("brick-code-block", className)}
          data-language={language}
          data-size={size}
          data-slot={slot(dataSlot, "code-block")}
          data-variant={variant}
          ref={ref}
          value={value}
        >
          {children}
        </AtomClipboard.Root>
      </CodeBlockContext.Provider>
    );
  },
);

export const CodeBlockHeader = forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  function CodeBlockHeader({ className, "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={classes("brick-code-block-header", className)} data-slot={slot(dataSlot, "code-block-header")} ref={ref} />;
  },
);

export const CodeBlockTitle = forwardRef<HTMLSpanElement, CodeBlockTitleProps>(
  function CodeBlockTitle({ className, "data-slot": dataSlot, ...props }, ref) {
    return <span {...props} className={classes("brick-code-block-title", className)} data-slot={slot(dataSlot, "code-block-title")} ref={ref} />;
  },
);

export const CodeBlockLanguage = forwardRef<HTMLSpanElement, CodeBlockLanguageProps>(
  function CodeBlockLanguage({ className, children, "data-slot": dataSlot, ...props }, ref) {
    const { language } = useCodeBlockContext();
    return <span {...props} className={classes("brick-code-block-language", className)} data-slot={slot(dataSlot, "code-block-language")} ref={ref}>{children ?? language}</span>;
  },
);

export const CodeBlockActions = forwardRef<HTMLDivElement, CodeBlockActionsProps>(
  function CodeBlockActions({ className, "data-slot": dataSlot, ...props }, ref) {
    return <div {...props} className={classes("brick-code-block-actions", className)} data-slot={slot(dataSlot, "code-block-actions")} ref={ref} />;
  },
);

export const CodeBlockContent = forwardRef<HTMLDivElement, CodeBlockContentProps>(
  function CodeBlockContent(
    { className, children, wrap = "scroll", focusable = true, dir = "ltr", "data-slot": dataSlot, ...props },
    ref,
  ) {
    const { value, language, size } = useCodeBlockContext();
    const syntaxClass = languageClass(language);
    return (
      <ScrollArea.Root className="brick-code-block-scroll-area" orientation="horizontal" scrollbarVisibility="interaction">
        <ScrollArea.Viewport
          {...props}
          className={classes("brick-code-block-content", className)}
          data-language={language}
          data-slot={slot(dataSlot, "code-block-content")}
          data-wrap={wrap}
          dir={dir}
          focusable={focusable}
          ref={ref}
        >
          <pre className="brick-code-block-pre" data-slot="code-block-pre">
            <Code
              className={syntaxClass}
              data-language={language}
              size={size}
              slot="code-block-code"
              tone="inherit"
              variant="plain"
            >
              {children ?? value}
            </Code>
          </pre>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    );
  },
);

export const CodeBlockCopyTrigger = forwardRef<HTMLElement, CodeBlockCopyTriggerProps>(
  function CodeBlockCopyTrigger(
    { variant = "ghost", tone = "neutral", size = "sm", shape = "rounded", startIcon, endIcon, children, "data-slot": dataSlot, ...props },
    ref,
  ) {
    return (
      <AtomClipboard.Trigger {...props} asChild data-slot={slot(dataSlot, "code-block-copy-trigger")} ref={ref as never}>
        <Button data-slot={slot(dataSlot, "code-block-copy-trigger")} variant={variant} tone={tone} size={size} shape={shape} startIcon={startIcon} endIcon={endIcon}>
          {children}
        </Button>
      </AtomClipboard.Trigger>
    );
  },
);

export const CodeBlockCopyIndicator = forwardRef<HTMLSpanElement, CodeBlockCopyIndicatorProps>(
  function CodeBlockCopyIndicator({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomClipboard.Indicator {...props} className={classes("brick-code-block-copy-indicator", className)} data-slot={slot(dataSlot, "code-block-copy-indicator")} ref={ref} />;
  },
);

export const CodeBlockCopyStatus = forwardRef<HTMLSpanElement, CodeBlockCopyStatusProps>(
  function CodeBlockCopyStatus({ className, "data-slot": dataSlot, ...props }, ref) {
    return <AtomClipboard.Status {...props} className={classes("brick-code-block-copy-status", className)} data-slot={slot(dataSlot, "code-block-copy-status")} ref={ref} />;
  },
);

CodeBlockRoot.displayName = "CodeBlock.Root";
CodeBlockHeader.displayName = "CodeBlock.Header";
CodeBlockTitle.displayName = "CodeBlock.Title";
CodeBlockLanguage.displayName = "CodeBlock.Language";
CodeBlockActions.displayName = "CodeBlock.Actions";
CodeBlockContent.displayName = "CodeBlock.Content";
CodeBlockCopyTrigger.displayName = "CodeBlock.CopyTrigger";
CodeBlockCopyIndicator.displayName = "CodeBlock.CopyIndicator";
CodeBlockCopyStatus.displayName = "CodeBlock.CopyStatus";

export const CodeBlock = Object.freeze({
  Root: CodeBlockRoot,
  Header: CodeBlockHeader,
  Title: CodeBlockTitle,
  Language: CodeBlockLanguage,
  Actions: CodeBlockActions,
  Content: CodeBlockContent,
  CopyTrigger: CodeBlockCopyTrigger,
  CopyIndicator: CodeBlockCopyIndicator,
  CopyStatus: CodeBlockCopyStatus,
});
