import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const fabVariants = tv({
  base: "fab",
  defaultVariants: {
    flower: false,
  },
  variants: {
    flower: {
      false: "",
      true: "fab-flower",
    },
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

/**
 * Trigger element for a Floating Action Button; renders a focusable `div` with
 * `role="button"` and `tabindex="0"` by default so it participates in keyboard navigation.
 */
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

/**
 * Close button slot for a Floating Action Button; applies the `fab-close` DaisyUI class
 * to its wrapper `div` and forwards all HTML div attributes.
 */
export const FabClose = (props: FabCloseProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={fabCloseVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

/**
 * Primary action slot for a Floating Action Button; applies the `fab-main-action`
 * DaisyUI class and forwards all HTML div attributes.
 */
export const FabMainAction = (props: FabMainActionProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={fabMainActionVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

/**
 * Individual action item inside a Floating Action Button speed-dial; renders a plain
 * `div` wrapper and passes through all HTML div attributes and the provided class.
 */
export const FabItem = (props: FabItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={local.class}>
      {safeChildren()}
    </div>
  );
};

const FabComponent = (props: FabProps) => {
  const [local, others] = splitProps(props, ["flower", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={fabVariants({
        class: local.class,
        flower: local.flower,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Fab = Object.assign(FabComponent, {
  Close: FabClose,
  Item: FabItem,
  MainAction: FabMainAction,
  Trigger: FabTrigger,
});
