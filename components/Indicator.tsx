import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const indicatorVariants = tv({
  base: "indicator",
});

export const indicatorItemVariants = tv({
  base: "indicator-item",
  defaultVariants: {
    horizontal: "end",
    vertical: "top",
  },
  variants: {
    horizontal: {
      center: "indicator-center",
      end: "indicator-end",
      start: "indicator-start",
    },
    vertical: {
      bottom: "indicator-bottom",
      middle: "indicator-middle",
      top: "indicator-top",
    },
  },
});

type IndicatorVariants = Parameters<typeof indicatorVariants>[0];
type IndicatorItemVariants = Parameters<typeof indicatorItemVariants>[0];

export type IndicatorProps = JSX.HTMLAttributes<HTMLDivElement> & IndicatorVariants;

export type IndicatorItemProps = JSX.HTMLAttributes<HTMLSpanElement> & IndicatorItemVariants;

/**
 * A `<span>` absolutely positioned over its `Indicator` sibling content.
 * Use `horizontal` (start/center/end) and `vertical` (top/middle/bottom) to
 * control which corner the badge or dot appears in.
 */
export const IndicatorItem = (props: IndicatorItemProps) => {
  const [local, others] = splitProps(props, ["horizontal", "vertical", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <span
      {...others}
      class={indicatorItemVariants({
        class: local.class,
        horizontal: local.horizontal,
        vertical: local.vertical,
      })}
    >
      {safeChildren()}
    </span>
  );
};

const IndicatorComponent = (props: IndicatorProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={indicatorVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

export const Indicator = Object.assign(IndicatorComponent, {
  Item: IndicatorItem,
});
