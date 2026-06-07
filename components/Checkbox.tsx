import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const checkboxVariants = tv({
  base: "checkbox",
  defaultVariants: {
    color: "default",
    size: "md",
  },
  variants: {
    color: {
      accent: "checkbox-accent",
      default: "",
      error: "checkbox-error",
      info: "checkbox-info",
      neutral: "checkbox-neutral",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
    },
    size: {
      lg: "checkbox-lg",
      md: "",
      sm: "checkbox-sm",
      xl: "checkbox-xl",
      xs: "checkbox-xs",
    },
  },
});

type CheckboxVariants = Parameters<typeof checkboxVariants>[0];

export type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & CheckboxVariants;

/**
 * A DaisyUI-styled checkbox input rendered as `<input type="checkbox">`.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral)
 * and `size` (xs, sm, md, lg, xl) variant props in addition to all standard input attributes.
 */
const CheckboxComponent = (props: CheckboxProps) => {
  const [local, others] = splitProps(props, ["color", "size", "class", "type"]);

  return (
    <input
      {...others}
      type="checkbox"
      class={checkboxVariants({
        class: local.class,
        color: local.color,
        size: local.size,
      })}
    />
  );
};

export const Checkbox = CheckboxComponent;
