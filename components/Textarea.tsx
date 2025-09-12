import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const textareaVariants = tv({
  base: "textarea",
  variants: {
    color: {
      default: "",
      neutral: "textarea-neutral",
      primary: "textarea-primary",
      secondary: "textarea-secondary",
      accent: "textarea-accent",
      info: "textarea-info",
      success: "textarea-success",
      warning: "textarea-warning",
      error: "textarea-error",
    },
    size: {
      xs: "textarea-xs",
      sm: "textarea-sm",
      md: "",
      lg: "textarea-lg",
      xl: "textarea-xl",
    },
    variant: {
      default: "",
      ghost: "textarea-ghost",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
});

type TextareaVariants = Parameters<typeof textareaVariants>[0];

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextareaVariants;

export const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "variant",
    "class",
  ]);

  return (
    <textarea
      {...others}
      class={textareaVariants({
        color: local.color,
        size: local.size,
        variant: local.variant,
        class: local.class,
      })}
    />
  );
};