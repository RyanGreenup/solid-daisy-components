import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type SelectVariantsSchema = {
  color: Record<"accent" | "default" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
  variant: Record<"default" | "ghost", string>;
};

export const selectVariants: TVReturnType<
  SelectVariantsSchema, undefined, "select", SelectVariantsSchema, undefined
> = tv<
  SelectVariantsSchema, [], {}, "select", undefined, undefined, SelectVariantsSchema, undefined
>({
  base: "select",
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    color: {
      accent: "select-accent",
      default: "",
      error: "select-error",
      info: "select-info",
      neutral: "select-neutral",
      primary: "select-primary",
      secondary: "select-secondary",
      success: "select-success",
      warning: "select-warning",
    },
    size: {
      lg: "select-lg",
      md: "",
      sm: "select-sm",
      xl: "select-xl",
      xs: "select-xs",
    },
    variant: {
      default: "",
      ghost: "select-ghost",
    },
  },
});

type SelectVariants = Parameters<typeof selectVariants>[0];

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & SelectVariants;

/**
 * A DaisyUI-styled `<select>` dropdown component.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral),
 * `size` (xs, sm, md, lg, xl), and `variant` (default, ghost) props alongside all standard
 * select attributes and children (`<option>` elements).
 */
export const Select = (props: SelectProps): JSX.Element => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "variant",
    "class",
    "children",
    "value",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <select
      {...others}
      value={local.value}
      class={selectVariants({
        class: local.class,
        color: local.color,
        size: local.size,
        variant: local.variant,
      })}
    >
      {safeChildren()}
    </select>
  );
};
