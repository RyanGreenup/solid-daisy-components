import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const fileInputVariants = tv({
  base: "file-input",
  variants: {
    color: {
      default: "",
      neutral: "file-input-neutral",
      primary: "file-input-primary",
      secondary: "file-input-secondary",
      accent: "file-input-accent",
      info: "file-input-info",
      success: "file-input-success",
      warning: "file-input-warning",
      error: "file-input-error",
    },
    size: {
      xs: "file-input-xs",
      sm: "file-input-sm",
      md: "",
      lg: "file-input-lg",
      xl: "file-input-xl",
    },
    variant: {
      default: "",
      ghost: "file-input-ghost",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
});

type FileInputVariants = Parameters<typeof fileInputVariants>[0];

export type FileInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & FileInputVariants;

export const FileInput = (props: FileInputProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "variant",
    "class",
    "type",
  ]);

  return (
    <input
      {...others}
      type="file"
      class={fileInputVariants({
        color: local.color,
        size: local.size,
        variant: local.variant,
        class: local.class,
      })}
    />
  );
};