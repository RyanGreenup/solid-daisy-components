import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { Accessor, JSX } from "solid-js";

export const progressVariants = tv({
  base: "progress",
  defaultVariants: {
    color: "default",
    size: "md",
  },
  variants: {
    color: {
      accent: "progress-accent",
      default: "",
      error: "progress-error",
      info: "progress-info",
      neutral: "progress-neutral",
      primary: "progress-primary",
      secondary: "progress-secondary",
      success: "progress-success",
      warning: "progress-warning",
    },
    size: {
      lg: "h-4",
      md: "h-3",
      sm: "h-2",
      xl: "h-5",
      xs: "h-1",
    },
  },
});

type ProgressVariants = Parameters<typeof progressVariants>[0];

export type ProgressProps = Omit<JSX.ProgressHTMLAttributes<HTMLProgressElement>, "value"> &
  Omit<JSX.IntrinsicElements["div"], "children"> &
  ProgressVariants & {
    value?: number | Accessor<number>;
    max?: number;
  };

/**
 * A `<progress>` element styled with DaisyUI progress classes. Supports `color`
 * (primary, secondary, success, error, etc.), `size` (xs–xl mapped to height),
 * and a `value` that may be a number or a reactive `Accessor<number>`.
 */
export const Progress = (props: ProgressProps) => {
  const [local, others] = splitProps(props, ["color", "size", "class", "value", "max"]);

  const getValue = () => {
    const val = local.value;
    return typeof val === "function" ? val() : val;
  };

  return (
    <progress
      {...others}
      value={getValue()}
      max={local.max ?? 100}
      class={progressVariants({
        class: local.class,
        color: local.color,
        size: local.size,
      })}
    />
  );
};
