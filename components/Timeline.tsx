import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const timelineVariants = tv({
  base: "timeline",
  variants: {
    orientation: {
      horizontal: "",
      vertical: "timeline-vertical",
    },
    snap: {
      default: "",
      icon: "timeline-snap-icon",
    },
    compact: {
      default: "",
      compact: "timeline-compact",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    snap: "default",
    compact: "default",
  },
});

export const timelineItemVariants = tv({
  base: "",
});

export const timelineStartVariants = tv({
  base: "timeline-start",
  variants: {
    box: {
      default: "",
      box: "timeline-box",
    },
  },
  defaultVariants: {
    box: "default",
  },
});

export const timelineMiddleVariants = tv({
  base: "timeline-middle",
});

export const timelineEndVariants = tv({
  base: "timeline-end",
  variants: {
    box: {
      default: "",
      box: "timeline-box",
    },
  },
  defaultVariants: {
    box: "default",
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

export const TimelineItem = (props: TimelineItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li
      {...others}
      class={timelineItemVariants({ class: local.class })}
    >
      {safeChildren()}
    </li>
  );
};

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

export const TimelineMiddle = (props: TimelineMiddleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={timelineMiddleVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

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
        orientation: local.orientation,
        snap: local.snap,
        compact: local.compact,
        class: local.class,
      })}
    >
      {safeChildren()}
    </ul>
  );
};

export const Timeline = Object.assign(TimelineComponent, {
  Item: TimelineItem,
  Start: TimelineStart,
  Middle: TimelineMiddle,
  End: TimelineEnd,
});