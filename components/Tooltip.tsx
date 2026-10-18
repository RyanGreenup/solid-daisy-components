import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type TooltipVariantsSchema = {
  color: Record<"accent" | "default" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning", string>;
  open: Record<"false" | "true", string>;
  placement: Record<"bottom" | "left" | "right" | "top", string>;
};

export const tooltipVariants: TVReturnType<
  TooltipVariantsSchema, undefined, "tooltip", TooltipVariantsSchema, undefined
> = tv<
  TooltipVariantsSchema, [], {}, "tooltip", undefined, undefined, TooltipVariantsSchema, undefined
>({
  base: "tooltip",
  defaultVariants: {
    color: "default",
    open: false,
    placement: "top",
  },
  variants: {
    color: {
      accent: "tooltip-accent",
      default: "",
      error: "tooltip-error",
      info: "tooltip-info",
      neutral: "tooltip-neutral",
      primary: "tooltip-primary",
      secondary: "tooltip-secondary",
      success: "tooltip-success",
      warning: "tooltip-warning",
    },
    open: {
      false: "",
      true: "tooltip-open",
    },
    placement: {
      bottom: "tooltip-bottom",
      left: "tooltip-left",
      right: "tooltip-right",
      top: "tooltip-top",
    },
  },
});

export const tooltipContentVariants: TVReturnType<
  {}, undefined, "tooltip-content", {}, undefined
> = tv<
  {}, [], {}, "tooltip-content", undefined, undefined, {}, undefined
>({
  base: "tooltip-content",
});

type TooltipVariants = Parameters<typeof tooltipVariants>[0];
type TooltipContentVariants = Parameters<typeof tooltipContentVariants>[0];

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> &
  TooltipVariants & {
    tip?: string;
  };

export type TooltipContentProps = JSX.HTMLAttributes<HTMLDivElement> & TooltipContentVariants;

/**
 * Optional rich-content slot for a `Tooltip`; applies the `tooltip-content` DaisyUI
 * class when custom JSX content is needed instead of the plain `tip` string attribute.
 */
export const TooltipContent = (props: TooltipContentProps): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={tooltipContentVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

const TooltipComponent = (props: TooltipProps): JSX.Element => {
  const [local, others] = splitProps(props, [
    "placement",
    "color",
    "open",
    "tip",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={tooltipVariants({
        class: local.class,
        color: local.color,
        open: local.open,
        placement: local.placement,
      })}
      data-tip={local.tip}
    >
      {safeChildren()}
    </div>
  );
};

export const Tooltip: typeof TooltipComponent & {
  Content: typeof TooltipContent;
} = Object.assign(TooltipComponent, {
  Content: TooltipContent,
});
