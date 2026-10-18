import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type ToggleVariantsSchema = {
  color: Record<"accent" | "default" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
};

export const toggleVariants: TVReturnType<
  ToggleVariantsSchema, undefined, "toggle", ToggleVariantsSchema, undefined
> = tv<
  ToggleVariantsSchema, [], {}, "toggle", undefined, undefined, ToggleVariantsSchema, undefined
>({
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
export const Toggle = (props: ToggleProps): JSX.Element => {
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
