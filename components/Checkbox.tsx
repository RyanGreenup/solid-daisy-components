import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const checkboxVariants = tv({
  base: "checkbox",
  variants: {
    color: {
      default: "",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      accent: "checkbox-accent",
      neutral: "checkbox-neutral",
      info: "checkbox-info",
      success: "checkbox-success",
      warning: "checkbox-warning",
      error: "checkbox-error",
    },
    size: {
      xs: "checkbox-xs",
      sm: "checkbox-sm",
      md: "",
      lg: "checkbox-lg",
      xl: "checkbox-xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type CheckboxVariants = Parameters<typeof checkboxVariants>[0];

export type CheckboxProps = JSX.InputHTMLAttributes<HTMLInputElement> & CheckboxVariants;

const CheckboxComponent = (props: CheckboxProps) => {
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
      class={checkboxVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};

export const Checkbox = CheckboxComponent;