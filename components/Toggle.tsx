import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const toggleVariants = tv({
  base: "toggle",
  variants: {
    color: {
      default: "",
      primary: "toggle-primary",
      secondary: "toggle-secondary",
      accent: "toggle-accent",
      neutral: "toggle-neutral",
      info: "toggle-info",
      success: "toggle-success",
      warning: "toggle-warning",
      error: "toggle-error",
    },
    size: {
      xs: "toggle-xs",
      sm: "toggle-sm",
      md: "",
      lg: "toggle-lg",
      xl: "toggle-xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type ToggleVariants = Parameters<typeof toggleVariants>[0];

export type ToggleProps = JSX.InputHTMLAttributes<HTMLInputElement> & ToggleVariants;

export const Toggle = (props: ToggleProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "class",
    "type",
  ]);

  return (
    <input
      {...others}
      type="checkbox"
      class={toggleVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};