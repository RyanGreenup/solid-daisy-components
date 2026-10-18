import { children, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type TabsVariantsSchema = {
  placement: Record<"bottom" | "top", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
  style: Record<"border" | "box" | "default" | "lift", string>;
};

export const tabsVariants: TVReturnType<
  TabsVariantsSchema, undefined, "tabs", TabsVariantsSchema, undefined
> = tv<
  TabsVariantsSchema, [], {}, "tabs", undefined, undefined, TabsVariantsSchema, undefined
>({
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

type TabVariantsSchema = {
  active: Record<"false" | "true", string>;
  disabled: Record<"false" | "true", string>;
};

export const tabVariants: TVReturnType<
  TabVariantsSchema, undefined, "tab", TabVariantsSchema, undefined
> = tv<
  TabVariantsSchema, [], {}, "tab", undefined, undefined, TabVariantsSchema, undefined
>({
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

export const tabContentVariants: TVReturnType<
  {}, undefined, "tab-content", {}, undefined
> = tv<
  {}, [], {}, "tab-content", undefined, undefined, {}, undefined
>({
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
export const Tab = (props: TabProps): JSX.Element => {
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
export const TabInput = (props: TabInputProps): JSX.Element => {
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
export const TabContent = (props: TabContentProps): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={tabContentVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

const TabsComponent = (props: TabsProps): JSX.Element => {
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

export const Tabs: typeof TabsComponent & {
  Content: typeof TabContent;
  Tab: typeof Tab;
  TabInput: typeof TabInput;
} = Object.assign(TabsComponent, {
  Content: TabContent,
  Tab,
  TabInput,
});
