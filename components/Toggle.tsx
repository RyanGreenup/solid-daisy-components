import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const toggleVariants = tv({
  base: "toggle",
  defaultVariants: {
    color: "default",
    size: "md",
  },
  variants: {
    color: {
      accent: "toggle-accent",
      default: "",
      error: "toggle-error",
      info: "toggle-info",
      neutral: "toggle-neutral",
      primary: "toggle-primary",
      secondary: "toggle-secondary",
      success: "toggle-success",
      warning: "toggle-warning",
    },
    size: {
      lg: "toggle-lg",
      md: "",
      sm: "toggle-sm",
      xl: "toggle-xl",
      xs: "toggle-xs",
    },
  },
});

type ToggleVariants = Parameters<typeof toggleVariants>[0];

export type ToggleProps = JSX.InputHTMLAttributes<HTMLInputElement> & ToggleVariants;

/**
 * A DaisyUI toggle switch rendered as `<input type="checkbox">` with toggle styling.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral)
 * and `size` (xs, sm, md, lg, xl) variant props in addition to all standard input attributes.
 */
export const Toggle = (props: ToggleProps) => {
  const [local, others] = splitProps(props, ["color", "size", "class", "type"]);

  return (
    <input
      {...others}
      type="checkbox"
      class={toggleVariants({
        class: local.class,
        color: local.color,
        size: local.size,
      })}
    />
  );
};
