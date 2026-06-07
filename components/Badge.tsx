import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const badgeVariants = tv({
  base: "badge",
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    color: {
      accent: "badge-accent",
      default: "",
      error: "badge-error",
      info: "badge-info",
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      success: "badge-success",
      warning: "badge-warning",
    },
    size: {
      lg: "badge-lg",
      md: "badge-md",
      sm: "badge-sm",
      xl: "badge-xl",
      xs: "badge-xs",
    },
    variant: {
      dash: "badge-dash",
      default: "",
      ghost: "badge-ghost",
      outline: "badge-outline",
      soft: "badge-soft",
    },
  },
});

type BadgeVariants = Parameters<typeof badgeVariants>[0];

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & BadgeVariants;

/**
 * A `<span>` rendered as a DaisyUI badge. Supports `color` (primary, error,
 * success, etc.), `size` (xs–xl), and `variant` (outline, ghost, soft, dash).
 */
export const Badge = (props: BadgeProps) => {
  const [local, others] = splitProps(props, ["variant", "color", "size", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <span
      {...others}
      class={badgeVariants({
        class: local.class,
        color: local.color,
        size: local.size,
        variant: local.variant,
      })}
    >
      {safeChildren()}
    </span>
  );
};
