import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const statsVariants = tv({
  base: "stats",
  defaultVariants: {
    direction: "horizontal",
    variant: "default",
  },
  variants: {
    direction: {
      horizontal: "",
      vertical: "stats-vertical",
    },
    variant: {
      bordered: "shadow",
      default: "",
    },
  },
});

export const statVariants = tv({
  base: "stat",
  defaultVariants: {
    place: "default",
  },
  variants: {
    place: {
      center: "place-items-center",
      default: "",
    },
  },
});

type StatsVariants = Parameters<typeof statsVariants>[0];
type StatVariants = Parameters<typeof statVariants>[0];

export type StatsProps = JSX.HTMLAttributes<HTMLDivElement> & StatsVariants;

export type StatProps = JSX.HTMLAttributes<HTMLDivElement> & StatVariants;

export type StatTitleProps = JSX.HTMLAttributes<HTMLDivElement>;
export type StatValueProps = JSX.HTMLAttributes<HTMLDivElement>;
export type StatDescProps = JSX.HTMLAttributes<HTMLDivElement>;
export type StatFigureProps = JSX.HTMLAttributes<HTMLDivElement>;
export type StatActionsProps = JSX.HTMLAttributes<HTMLDivElement>;

/**
 * Wrapper container for one or more `Stat` items, applying DaisyUI's `stats`
 * class. Supports `direction` (`horizontal` / `vertical`) and `variant`
 * (`default` / `bordered` which adds a box shadow).
 */
export const Stats = (props: StatsProps) => {
  const [local, others] = splitProps(props, ["direction", "variant", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={statsVariants({
        class: local.class,
        direction: local.direction,
        variant: local.variant,
      })}
    >
      {safeChildren()}
    </div>
  );
};

/**
 * Individual statistic card within a `Stats` container, applying the DaisyUI
 * `stat` class. The `place` prop (`default` / `center`) controls whether
 * items are centered with `place-items-center`.
 */
export const Stat = (props: StatProps) => {
  const [local, others] = splitProps(props, ["place", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={statVariants({
        class: local.class,
        place: local.place,
      })}
    >
      {safeChildren()}
    </div>
  );
};

/**
 * Label / heading for a DaisyUI stat item, rendered with the `stat-title`
 * class. Typically contains a short descriptor such as "Total Users".
 */
export const StatTitle = (props: StatTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-title ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

/**
 * Primary numeric or text value displayed in a DaisyUI stat item, rendered
 * with the `stat-value` class which applies large, prominent typography.
 */
export const StatValue = (props: StatValueProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-value ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

/**
 * Secondary description or contextual note for a DaisyUI stat item, rendered
 * with the `stat-desc` class. Used for supplementary text such as trend
 * information or data source notes.
 */
export const StatDesc = (props: StatDescProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-desc ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

/**
 * Icon or image slot for a DaisyUI stat item, rendered with the `stat-figure`
 * class. Positioned at the side of the stat to display a supporting visual
 * such as an SVG icon or avatar.
 */
export const StatFigure = (props: StatFigureProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-figure ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

/**
 * Actions area for a DaisyUI stat item, rendered with the `stat-actions`
 * class. Intended to hold buttons or links that relate to the displayed
 * statistic, such as "View details".
 */
export const StatActions = (props: StatActionsProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-actions ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};
