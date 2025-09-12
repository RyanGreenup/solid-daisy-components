import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const indicatorVariants = tv({
  base: "indicator",
});

export const indicatorItemVariants = tv({
  base: "indicator-item",
  variants: {
    horizontal: {
      start: "indicator-start",
      center: "indicator-center",
      end: "indicator-end",
    },
    vertical: {
      top: "indicator-top",
      middle: "indicator-middle",
      bottom: "indicator-bottom",
    },
  },
  defaultVariants: {
    horizontal: "end",
    vertical: "top",
  },
});

type IndicatorVariants = Parameters<typeof indicatorVariants>[0];
type IndicatorItemVariants = Parameters<typeof indicatorItemVariants>[0];

export type IndicatorProps = JSX.HTMLAttributes<HTMLDivElement> & IndicatorVariants;

export type IndicatorItemProps = JSX.HTMLAttributes<HTMLSpanElement> & IndicatorItemVariants;

export const IndicatorItem = (props: IndicatorItemProps) => {
  const [local, others] = splitProps(props, [
    "horizontal",
    "vertical",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <span
      {...others}
      class={indicatorItemVariants({
        horizontal: local.horizontal,
        vertical: local.vertical,
        class: local.class,
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
    <div
      {...others}
      class={indicatorVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

export const Indicator = Object.assign(IndicatorComponent, {
  Item: IndicatorItem,
});