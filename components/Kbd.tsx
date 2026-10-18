import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type KbdVariantsSchema = {
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
};

export const kbdVariants: TVReturnType<
  KbdVariantsSchema, undefined, "kbd", KbdVariantsSchema, undefined
> = tv<
  KbdVariantsSchema, [], {}, "kbd", undefined, undefined, KbdVariantsSchema, undefined
>({
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
export const Kbd = (props: KbdProps): JSX.Element => {
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
