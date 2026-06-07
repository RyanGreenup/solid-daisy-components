import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const textareaVariants = tv({
  base: "textarea",
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    color: {
      accent: "textarea-accent",
      default: "",
      error: "textarea-error",
      info: "textarea-info",
      neutral: "textarea-neutral",
      primary: "textarea-primary",
      secondary: "textarea-secondary",
      success: "textarea-success",
      warning: "textarea-warning",
    },
    size: {
      lg: "textarea-lg",
      md: "",
      sm: "textarea-sm",
      xl: "textarea-xl",
      xs: "textarea-xs",
    },
    variant: {
      default: "",
      ghost: "textarea-ghost",
    },
  },
});

type TextareaVariants = Parameters<typeof textareaVariants>[0];

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaVariants;

/**
 * A DaisyUI-styled `<textarea>` component.
 * Supports `color` (primary, secondary, accent, info, success, warning, error, neutral),
 * `size` (xs, sm, md, lg, xl), and `variant` (default, ghost) props alongside all standard
 * textarea attributes.
 */
export const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, ["color", "size", "variant", "class"]);

  return (
    <textarea
      {...others}
      class={textareaVariants({
        class: local.class,
        color: local.color,
        size: local.size,
        variant: local.variant,
      })}
    />
  );
};
