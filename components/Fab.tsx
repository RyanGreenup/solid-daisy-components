import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const fabVariants = tv({
  base: "fab",
  variants: {
    flower: {
      false: "",
      true: "fab-flower",
    },
  },
  defaultVariants: {
    flower: false,
  },
});

export const fabCloseVariants = tv({
  base: "fab-close",
});

export const fabMainActionVariants = tv({
  base: "fab-main-action",
});

type FabVariants = Parameters<typeof fabVariants>[0];
type FabCloseVariants = Parameters<typeof fabCloseVariants>[0];
type FabMainActionVariants = Parameters<typeof fabMainActionVariants>[0];

export type FabProps = JSX.HTMLAttributes<HTMLDivElement> & FabVariants;

export type FabTriggerProps = JSX.HTMLAttributes<HTMLDivElement>;

export type FabCloseProps = JSX.HTMLAttributes<HTMLDivElement> & FabCloseVariants;

export type FabMainActionProps = JSX.HTMLAttributes<HTMLDivElement> & FabMainActionVariants;

export type FabItemProps = JSX.HTMLAttributes<HTMLDivElement>;

export const FabTrigger = (props: FabTriggerProps) => {
  const [local, others] = splitProps(props, ["class", "children", "tabindex", "role"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      tabindex={local.tabindex ?? "0"}
      role={local.role ?? "button"}
      class={local.class}
    >
      {safeChildren()}
    </div>
  );
};

export const FabClose = (props: FabCloseProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={fabCloseVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

export const FabMainAction = (props: FabMainActionProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={fabMainActionVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

export const FabItem = (props: FabItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={local.class}
    >
      {safeChildren()}
    </div>
  );
};

const FabComponent = (props: FabProps) => {
  const [local, others] = splitProps(props, [
    "flower",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={fabVariants({
        flower: local.flower,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Fab = Object.assign(FabComponent, {
  Trigger: FabTrigger,
  Close: FabClose,
  MainAction: FabMainAction,
  Item: FabItem,
});