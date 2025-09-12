import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const radioVariants = tv({
  base: "radio",
  variants: {
    color: {
      default: "",
      neutral: "radio-neutral",
      primary: "radio-primary",
      secondary: "radio-secondary",
      accent: "radio-accent",
      success: "radio-success",
      warning: "radio-warning",
      info: "radio-info",
      error: "radio-error",
    },
    size: {
      xs: "radio-xs",
      sm: "radio-sm",
      md: "",
      lg: "radio-lg",
      xl: "radio-xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type RadioVariants = Parameters<typeof radioVariants>[0];

export type RadioProps = JSX.InputHTMLAttributes<HTMLInputElement> & RadioVariants;

export const Radio = (props: RadioProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "class",
    "type",
  ]);

  return (
    <input
      {...others}
      type="radio"
      class={radioVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};