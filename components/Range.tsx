import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const rangeVariants = tv({
  base: "range",
  variants: {
    color: {
      default: "",
      neutral: "range-neutral",
      primary: "range-primary",
      secondary: "range-secondary",
      accent: "range-accent",
      success: "range-success",
      warning: "range-warning",
      info: "range-info",
      error: "range-error",
    },
    size: {
      xs: "range-xs",
      sm: "range-sm",
      md: "",
      lg: "range-lg",
      xl: "range-xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type RangeVariants = Parameters<typeof rangeVariants>[0];

export type RangeProps = JSX.InputHTMLAttributes<HTMLInputElement> & RangeVariants;

export const Range = (props: RangeProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "class",
    "type",
  ]);

  return (
    <input
      {...others}
      type="range"
      class={rangeVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};