import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const fileInputVariants = tv({
  base: "file-input",
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    color: {
      accent: "file-input-accent",
      default: "",
      error: "file-input-error",
      info: "file-input-info",
      neutral: "file-input-neutral",
      primary: "file-input-primary",
      secondary: "file-input-secondary",
      success: "file-input-success",
      warning: "file-input-warning",
    },
    size: {
      lg: "file-input-lg",
      md: "",
      sm: "file-input-sm",
      xl: "file-input-xl",
      xs: "file-input-xs",
    },
    variant: {
      default: "",
      ghost: "file-input-ghost",
    },
  },
});

type FileInputVariants = Parameters<typeof fileInputVariants>[0];

export type FileInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & FileInputVariants;

/**
 * A DaisyUI-styled file picker rendered as `<input type="file">`.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral),
 * `size` (xs, sm, md, lg, xl), and `variant` (default, ghost) props alongside all standard
 * input attributes.
 */
export const FileInput = (props: FileInputProps) => {
  const [local, others] = splitProps(props, ["color", "size", "variant", "class", "type"]);

  return (
    <input
      {...others}
      type="file"
      class={fileInputVariants({
        class: local.class,
        color: local.color,
        size: local.size,
        variant: local.variant,
      })}
    />
  );
};
