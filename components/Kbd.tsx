import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const kbdVariants = tv({
  base: "kbd",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "kbd-lg",
      md: "",
      sm: "kbd-sm",
      xl: "kbd-xl",
      xs: "kbd-xs",
    },
  },
});

type KbdVariants = Parameters<typeof kbdVariants>[0];

export type KbdProps = JSX.HTMLAttributes<HTMLElement> & KbdVariants;

/**
 * A `<kbd>` element styled with the DaisyUI `kbd` class to visually represent
 * a keyboard key or shortcut. Use `size` (xs–xl) to scale the badge.
 */
export const Kbd = (props: KbdProps) => {
  const [local, others] = splitProps(props, ["size", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <kbd
      {...others}
      class={kbdVariants({
        class: local.class,
        size: local.size,
      })}
    >
      {safeChildren()}
    </kbd>
  );
};
