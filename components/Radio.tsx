import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type RadioVariantsSchema = {
  color: Record<"accent" | "default" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
};

export const radioVariants: TVReturnType<
  RadioVariantsSchema, undefined, "radio", RadioVariantsSchema, undefined
> = tv<
  RadioVariantsSchema, [], {}, "radio", undefined, undefined, RadioVariantsSchema, undefined
>({
  base: "radio",
  defaultVariants: {
    color: "default",
    size: "md",
  },
  variants: {
    color: {
      accent: "radio-accent",
      default: "",
      error: "radio-error",
      info: "radio-info",
      neutral: "radio-neutral",
      primary: "radio-primary",
      secondary: "radio-secondary",
      success: "radio-success",
      warning: "radio-warning",
    },
    size: {
      lg: "radio-lg",
      md: "",
      sm: "radio-sm",
      xl: "radio-xl",
      xs: "radio-xs",
    },
  },
});

type RadioVariants = Parameters<typeof radioVariants>[0];

export type RadioProps = JSX.InputHTMLAttributes<HTMLInputElement> & RadioVariants;

/**
 * A DaisyUI-styled radio button rendered as `<input type="radio">`.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral)
 * and `size` (xs, sm, md, lg, xl) variant props in addition to all standard input attributes.
 */
export const Radio = (props: RadioProps): JSX.Element => {
  const [local, others] = splitProps(props, ["color", "size", "class", "type"]);

  return (
    <input
      {...others}
      type="radio"
      class={radioVariants({
        class: local.class,
        color: local.color,
        size: local.size,
      })}
    />
  );
};
