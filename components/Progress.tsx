import { tv } from "tailwind-variants";
import { splitProps, JSX, Accessor } from "solid-js";

export const progressVariants = tv({
  base: "progress",
  variants: {
    color: {
      default: "",
      neutral: "progress-neutral",
      primary: "progress-primary",
      secondary: "progress-secondary",
      accent: "progress-accent",
      info: "progress-info",
      success: "progress-success",
      warning: "progress-warning",
      error: "progress-error",
    },
    size: {
      xs: "h-1",
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
      xl: "h-5",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type ProgressVariants = Parameters<typeof progressVariants>[0];

export type ProgressProps = Omit<JSX.ProgressHTMLAttributes<HTMLProgressElement>, "value"> &
  ProgressVariants & {
    value?: number | Accessor<number>;
    max?: number;
  };

export const Progress = (props: ProgressProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "class",
    "value",
    "max",
  ]);

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
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};