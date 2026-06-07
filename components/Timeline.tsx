import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const timelineVariants = tv({
  base: "timeline",
  defaultVariants: {
    compact: "default",
    orientation: "horizontal",
    snap: "default",
  },
  variants: {
    compact: {
      compact: "timeline-compact",
      default: "",
    },
    orientation: {
      horizontal: "",
      vertical: "timeline-vertical",
    },
    snap: {
      default: "",
      icon: "timeline-snap-icon",
    },
  },
});

export const timelineItemVariants = tv({
  base: "",
});

export const timelineStartVariants = tv({
  base: "timeline-start",
  defaultVariants: {
    box: "default",
  },
  variants: {
    box: {
      box: "timeline-box",
      default: "",
    },
  },
});

export const timelineMiddleVariants = tv({
  base: "timeline-middle",
});

export const timelineEndVariants = tv({
  base: "timeline-end",
  defaultVariants: {
    box: "default",
  },
  variants: {
    box: {
      box: "timeline-box",
      default: "",
    },
  },
});

type TimelineVariants = Parameters<typeof timelineVariants>[0];
type TimelineItemVariants = Parameters<typeof timelineItemVariants>[0];
type TimelineStartVariants = Parameters<typeof timelineStartVariants>[0];
type TimelineMiddleVariants = Parameters<typeof timelineMiddleVariants>[0];
type TimelineEndVariants = Parameters<typeof timelineEndVariants>[0];

export type TimelineProps = JSX.HTMLAttributes<HTMLUListElement> & TimelineVariants;

export type TimelineItemProps = JSX.LiHTMLAttributes<HTMLLIElement> & TimelineItemVariants;

export type TimelineStartProps = JSX.HTMLAttributes<HTMLDivElement> & TimelineStartVariants;

export type TimelineMiddleProps = JSX.HTMLAttributes<HTMLDivElement> & TimelineMiddleVariants;

export type TimelineEndProps = JSX.HTMLAttributes<HTMLDivElement> & TimelineEndVariants;

/**
 * A single entry in a DaisyUI timeline list, rendered as an `<li>`. Acts as
 * the row/column container that holds `TimelineStart`, `TimelineMiddle`, and
 * `TimelineEnd` sub-components.
 */
export const TimelineItem = (props: TimelineItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li {...others} class={timelineItemVariants({ class: local.class })}>
      {safeChildren()}
    </li>
  );
};

/**
 * Content placed before (above or to the left of) the connector in a
 * DaisyUI timeline item. Applies the `timeline-start` class; the optional
 * `box` prop adds `timeline-box` to render it as a rounded bordered box.
 */
export const TimelineStart = (props: TimelineStartProps) => {
  const [local, others] = splitProps(props, ["box", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={timelineStartVariants({
        box: local.box,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

/**
 * The connector/icon slot in the middle of a DaisyUI timeline item, rendered
 * with the `timeline-middle` class. Typically contains a small circle SVG or
 * icon that visually marks the point on the timeline axis.
 */
export const TimelineMiddle = (props: TimelineMiddleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={timelineMiddleVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

/**
 * Content placed after (below or to the right of) the connector in a
 * DaisyUI timeline item. Applies the `timeline-end` class; the optional
 * `box` prop adds `timeline-box` to render it as a rounded bordered box.
 */
export const TimelineEnd = (props: TimelineEndProps) => {
  const [local, others] = splitProps(props, ["box", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={timelineEndVariants({
        box: local.box,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

const TimelineComponent = (props: TimelineProps) => {
  const [local, others] = splitProps(props, [
    "orientation",
    "snap",
    "compact",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <ul
      {...others}
      class={timelineVariants({
        class: local.class,
        compact: local.compact,
        orientation: local.orientation,
        snap: local.snap,
      })}
    >
      {safeChildren()}
    </ul>
  );
};

export const Timeline = Object.assign(TimelineComponent, {
  End: TimelineEnd,
  Item: TimelineItem,
  Middle: TimelineMiddle,
  Start: TimelineStart,
});
