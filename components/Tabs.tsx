import { children, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const tabsVariants = tv({
  base: "tabs",
  defaultVariants: {
    placement: "top",
    size: "md",
    style: "default",
  },
  variants: {
    placement: {
      bottom: "tabs-bottom",
      top: "tabs-top",
    },
    size: {
      lg: "tabs-lg",
      md: "",
      sm: "tabs-sm",
      xl: "tabs-xl",
      xs: "tabs-xs",
    },
    style: {
      border: "tabs-border",
      box: "tabs-box",
      default: "",
      lift: "tabs-lift",
    },
  },
});

export const tabVariants = tv({
  base: "tab",
  defaultVariants: {
    active: false,
    disabled: false,
  },
  variants: {
    active: {
      false: "",
      true: "tab-active",
    },
    disabled: {
      false: "",
      true: "tab-disabled",
    },
  },
});

export const tabContentVariants = tv({
  base: "tab-content",
});

type TabsVariants = Parameters<typeof tabsVariants>[0];
type TabVariants = Parameters<typeof tabVariants>[0];
type TabContentVariants = Parameters<typeof tabContentVariants>[0];

export type TabsProps = JSX.HTMLAttributes<HTMLDivElement> &
  TabsVariants & {
    role?: string;
  };

export type TabProps = JSX.HTMLAttributes<HTMLElement> &
  TabVariants & {
    role?: string;
    as?: "button" | "a" | "div" | "label";
  };

export type TabInputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  TabVariants & {
    role?: string;
  };

export type TabContentProps = JSX.HTMLAttributes<HTMLDivElement> & TabContentVariants;

/**
 * A single tab trigger rendered as a `<button>` (or another element via `as`).
 * Applies `tab-active` and `tab-disabled` variants; forwards `role="tab"` by default.
 */
export const Tab = (props: TabProps) => {
  const [local, others] = splitProps(props, [
    "active",
    "disabled",
    "class",
    "children",
    "role",
    "as",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <Dynamic
      component={local.as || "button"}
      {...(others as any)}
      role={local.role || "tab"}
      class={tabVariants({
        active: local.active,
        class: local.class,
        disabled: local.disabled,
      })}
    >
      {safeChildren()}
    </Dynamic>
  );
};

/**
 * A radio `<input>` styled as a tab trigger, used inside a `Tabs` container
 * when tab switching is driven by native radio-button state rather than JS.
 */
export const TabInput = (props: TabInputProps) => {
  const [local, others] = splitProps(props, ["active", "disabled", "class", "role", "type"]);

  return (
    <input
      {...others}
      type="radio"
      role={local.role || "tab"}
      class={tabVariants({
        active: local.active,
        class: local.class,
        disabled: local.disabled,
      })}
    />
  );
};

/**
 * The content panel associated with a tab; renders a `<div>` with the
 * `tab-content` DaisyUI class so it shows/hides alongside its tab trigger.
 */
export const TabContent = (props: TabContentProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={tabContentVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

const TabsComponent = (props: TabsProps) => {
  const [local, others] = splitProps(props, [
    "style",
    "size",
    "placement",
    "class",
    "children",
    "role",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      role={local.role || "tablist"}
      class={tabsVariants({
        class: local.class,
        placement: local.placement,
        size: local.size,
        style: local.style,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Tabs = Object.assign(TabsComponent, {
  Content: TabContent,
  Tab,
  TabInput,
});
