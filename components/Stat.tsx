import { tv } from "tailwind-variants";
import { splitProps, children, JSX, Show } from "solid-js";

export const statsVariants = tv({
  base: "stats",
  variants: {
    direction: {
      horizontal: "",
      vertical: "stats-vertical",
    },
    variant: {
      default: "",
      bordered: "shadow",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    variant: "default",
  },
});

export const statVariants = tv({
  base: "stat",
  variants: {
    place: {
      default: "",
      center: "place-items-center",
    },
  },
  defaultVariants: {
    place: "default",
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

export const Stats = (props: StatsProps) => {
  const [local, others] = splitProps(props, [
    "direction",
    "variant",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={statsVariants({
        direction: local.direction,
        variant: local.variant,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Stat = (props: StatProps) => {
  const [local, others] = splitProps(props, ["place", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={statVariants({
        place: local.place,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const StatTitle = (props: StatTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-title ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

export const StatValue = (props: StatValueProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-value ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

export const StatDesc = (props: StatDescProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-desc ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

export const StatFigure = (props: StatFigureProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-figure ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};

export const StatActions = (props: StatActionsProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={`stat-actions ${local.class || ""}`}>
      {safeChildren()}
    </div>
  );
};