import { NavigationMenu as KobalteNavigationMenu } from "@kobalte/core/navigation-menu";
import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";
import ChevronDown from "lucide-solid/icons/chevron-down";
import styles from "./navigation-menu.module.css";

export const navigationMenuVariants = tv({
  slots: {
    root: "flex justify-center items-center p-1 bg-base-100 w-max rounded-lg shadow-sm border border-base-300",
    trigger: "flex items-center justify-center gap-2 px-4 py-3 bg-base-100 text-base-content font-medium rounded-md transition-colors hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[highlighted]:bg-base-200 text-sm border-none cursor-pointer",
    triggerLink: "text-primary no-underline",
    icon: "h-4 w-4 transition-transform duration-200 ease-in-out",
    viewport: "relative flex justify-center items-center bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-hidden transition-all duration-250 ease-out opacity-0 pointer-events-none data-[expanded]:opacity-100 data-[expanded]:pointer-events-auto",
    arrow: "fill-base-100 transition-transform duration-200",
    content: "absolute top-0 left-0 p-6 grid gap-3 grid-auto-flow-col grid-rows-3 animate-duration-250 animate-timing-ease animate-fill-forwards pointer-events-none data-[expanded]:pointer-events-auto",
    item: "block outline-none no-underline select-none p-3 rounded-md text-sm leading-tight hover:bg-base-200 focus:bg-base-200",
    itemCallout: "flex flex-col justify-end w-full h-full bg-gradient-to-br from-primary to-secondary rounded-md p-6 no-underline outline-none select-none row-span-3 focus:outline-2 focus:outline-primary/50",
    itemLabel: "text-base mb-2 font-medium text-base-content leading-tight",
    itemLabelCallout: "mt-4 text-xl text-primary-content",
    itemDescription: "text-sm opacity-80 text-base-content leading-snug",
    itemDescriptionCallout: "text-primary-content",
    separator: "h-px bg-base-300 mx-3 my-1",
  },
  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        root: "flex-col",
      },
    },
    size: {
      sm: {
        trigger: "px-3 py-2 text-xs",
        content: "p-4 gap-2",
        item: "p-2 text-xs",
        itemCallout: "p-4",
      },
      md: {},
      lg: {
        trigger: "px-6 py-4 text-base",
        content: "p-8 gap-4",
        item: "p-4 text-base",
        itemCallout: "p-8",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export interface NavigationMenuProps extends Omit<JSX.HTMLAttributes<HTMLElement>, "onChange"> {
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | null | undefined) => void;
  loop?: boolean;
  delayDuration?: number;
  skipDelayDuration?: number;
  focusOnAlt?: boolean;
  forceMount?: boolean;
  children: JSX.Element;
}

export function NavigationMenu(props: NavigationMenuProps) {
  const [local, others] = splitProps(props, [
    "orientation",
    "size",
    "class",
    "children",
    "defaultValue",
    "value",
    "onChange",
    "loop",
    "delayDuration",
    "skipDelayDuration",
    "focusOnAlt",
    "forceMount",
  ]);

  const safeChildren = children(() => local.children);
  const tvStyles = navigationMenuVariants({
    orientation: local.orientation,
    size: local.size,
  });

  return (
    <KobalteNavigationMenu
      {...others}
      class={tvStyles.root({ class: local.class })}
      orientation={local.orientation}
      defaultValue={local.defaultValue}
      value={local.value}
      onValueChange={local.onChange}
      loop={local.loop}
      delayDuration={local.delayDuration}
      skipDelayDuration={local.skipDelayDuration}
      focusOnAlt={local.focusOnAlt}
      forceMount={local.forceMount}
    >
      {safeChildren()}
    </KobalteNavigationMenu>
  );
}

// Export individual components for advanced usage - direct exports from Kobalte
export const NavigationMenuViewport = KobalteNavigationMenu.Viewport;
export const NavigationMenuArrow = KobalteNavigationMenu.Arrow;
export const NavigationMenuMenu = KobalteNavigationMenu.Menu;
export const NavigationMenuTrigger = KobalteNavigationMenu.Trigger;
export const NavigationMenuIcon = KobalteNavigationMenu.Icon;
export const NavigationMenuPortal = KobalteNavigationMenu.Portal;
export const NavigationMenuContent = KobalteNavigationMenu.Content;
export const NavigationMenuItem = KobalteNavigationMenu.Item;
export const NavigationMenuItemLabel = KobalteNavigationMenu.ItemLabel;
export const NavigationMenuItemDescription = KobalteNavigationMenu.ItemDescription;
export const NavigationMenuSeparator = KobalteNavigationMenu.Separator;
export const NavigationMenuGroup = KobalteNavigationMenu.Group;
export const NavigationMenuGroupLabel = KobalteNavigationMenu.GroupLabel;
export const NavigationMenuSub = KobalteNavigationMenu.Sub;
export const NavigationMenuSubTrigger = KobalteNavigationMenu.SubTrigger;
export const NavigationMenuSubContent = KobalteNavigationMenu.SubContent;
export const NavigationMenuRadioGroup = KobalteNavigationMenu.RadioGroup;
export const NavigationMenuRadioItem = KobalteNavigationMenu.RadioItem;
export const NavigationMenuCheckboxItem = KobalteNavigationMenu.CheckboxItem;
export const NavigationMenuItemIndicator = KobalteNavigationMenu.ItemIndicator;

// Main export object with dot notation support
NavigationMenu.Viewport = NavigationMenuViewport;
NavigationMenu.Arrow = NavigationMenuArrow;
NavigationMenu.Menu = NavigationMenuMenu;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Icon = NavigationMenuIcon;
NavigationMenu.Portal = NavigationMenuPortal;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.ItemLabel = NavigationMenuItemLabel;
NavigationMenu.ItemDescription = NavigationMenuItemDescription;
NavigationMenu.Separator = NavigationMenuSeparator;
NavigationMenu.Group = NavigationMenuGroup;
NavigationMenu.GroupLabel = NavigationMenuGroupLabel;
NavigationMenu.Sub = NavigationMenuSub;
NavigationMenu.SubTrigger = NavigationMenuSubTrigger;
NavigationMenu.SubContent = NavigationMenuSubContent;
NavigationMenu.RadioGroup = NavigationMenuRadioGroup;
NavigationMenu.RadioItem = NavigationMenuRadioItem;
NavigationMenu.CheckboxItem = NavigationMenuCheckboxItem;
NavigationMenu.ItemIndicator = NavigationMenuItemIndicator;