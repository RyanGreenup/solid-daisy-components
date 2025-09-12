import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";
import { Dynamic } from "solid-js/web"

export const tabsVariants = tv({
  base: "tabs",
  variants: {
    style: {
      default: "",
      box: "tabs-box",
      border: "tabs-border",
      lift: "tabs-lift",
    },
    size: {
      xs: "tabs-xs",
      sm: "tabs-sm",
      md: "",
      lg: "tabs-lg",
      xl: "tabs-xl",
    },
    placement: {
      top: "tabs-top",
      bottom: "tabs-bottom",
    },
  },
  defaultVariants: {
    style: "default",
    size: "md",
    placement: "top",
  },
});

export const tabVariants = tv({
  base: "tab",
  variants: {
    active: {
      true: "tab-active",
      false: "",
    },
    disabled: {
      true: "tab-disabled",
      false: "",
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export const tabContentVariants = tv({
  base: "tab-content",
});

type TabsVariants = Parameters<typeof tabsVariants>[0];
type TabVariants = Parameters<typeof tabVariants>[0];
type TabContentVariants = Parameters<typeof tabContentVariants>[0];

export type TabsProps = JSX.HTMLAttributes<HTMLDivElement> & TabsVariants & {
  role?: string;
};

export type TabProps = JSX.HTMLAttributes<HTMLElement> & TabVariants & {
  role?: string;
  as?: "button" | "a" | "div" | "label";
};

export type TabInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & TabVariants & {
  role?: string;
};

export type TabContentProps = JSX.HTMLAttributes<HTMLDivElement> & TabContentVariants;

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
      {...others}
      role={local.role || "tab"}
      class={tabVariants({
        active: local.active,
        disabled: local.disabled,
        class: local.class,
      })}
    >
      {safeChildren()}
    </Dynamic>
  );
};

export const TabInput = (props: TabInputProps) => {
  const [local, others] = splitProps(props, [
    "active",
    "disabled",
    "class",
    "role",
    "type",
  ]);

  return (
    <input
      {...others}
      type="radio"
      role={local.role || "tab"}
      class={tabVariants({
        active: local.active,
        disabled: local.disabled,
        class: local.class,
      })}
    />
  );
};

export const TabContent = (props: TabContentProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={tabContentVariants({ class: local.class })}
    >
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
        style: local.style,
        size: local.size,
        placement: local.placement,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Tabs = Object.assign(TabsComponent, {
  Tab,
  TabInput,
  Content: TabContent,
});
