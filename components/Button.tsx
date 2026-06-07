import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const buttonVariants = tv({
  base: "btn",
  defaultVariants: {
    color: "default",
    shape: "default",
    size: "md",
    state: "default",
    variant: "default",
    width: "default",
  },
  variants: {
    color: {
      accent: "btn-accent",
      default: "",
      error: "btn-error",
      info: "btn-info",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      warning: "btn-warning",
    },
    shape: {
      circle: "btn-circle",
      default: "",
      square: "btn-square",
    },
    size: {
      lg: "btn-lg",
      md: "",
      sm: "btn-sm",
      xl: "btn-xl",
      xs: "btn-xs",
    },
    state: {
      active: "btn-active",
      default: "",
      disabled: "btn-disabled",
    },
    variant: {
      dash: "btn-dash",
      default: "",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      soft: "btn-soft",
    },
    width: {
      block: "btn-block",
      default: "",
      wide: "btn-wide",
    },
  },
});

type ButtonVariants = Parameters<typeof buttonVariants>[0];

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

/**
 * DaisyUI `btn` button element with tailwind-variants support for color, size, shape,
 * variant (ghost, outline, soft, link, dash), width, and state (active, disabled).
 * Renders a native `<button>` and forwards all standard HTML button attributes.
 */
export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "color",
    "size",
    "shape",
    "width",
    "state",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <button
      {...others}
      class={buttonVariants({
        class: local.class,
        color: local.color,
        shape: local.shape,
        size: local.size,
        state: local.state,
        variant: local.variant,
        width: local.width,
      })}
    >
      {safeChildren()}
    </button>
  );
};
