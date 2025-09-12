import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const tooltipVariants = tv({
  base: "tooltip",
  variants: {
    placement: {
      top: "tooltip-top",
      bottom: "tooltip-bottom",
      left: "tooltip-left",
      right: "tooltip-right",
    },
    color: {
      default: "",
      neutral: "tooltip-neutral",
      primary: "tooltip-primary",
      secondary: "tooltip-secondary",
      accent: "tooltip-accent",
      info: "tooltip-info",
      success: "tooltip-success",
      warning: "tooltip-warning",
      error: "tooltip-error",
    },
    open: {
      true: "tooltip-open",
      false: "",
    },
  },
  defaultVariants: {
    placement: "top",
    color: "default",
    open: false,
  },
});

export const tooltipContentVariants = tv({
  base: "tooltip-content",
});

type TooltipVariants = Parameters<typeof tooltipVariants>[0];
type TooltipContentVariants = Parameters<typeof tooltipContentVariants>[0];

export type TooltipProps = JSX.HTMLAttributes<HTMLDivElement> & TooltipVariants & {
  tip?: string;
};

export type TooltipContentProps = JSX.HTMLAttributes<HTMLDivElement> & TooltipContentVariants;

export const TooltipContent = (props: TooltipContentProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={tooltipContentVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

const TooltipComponent = (props: TooltipProps) => {
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
        placement: local.placement,
        color: local.color,
        open: local.open,
        class: local.class,
      })}
      data-tip={local.tip}
    >
      {safeChildren()}
    </div>
  );
};

export const Tooltip = Object.assign(TooltipComponent, {
  Content: TooltipContent,
});