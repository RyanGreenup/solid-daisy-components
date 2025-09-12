import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const selectVariants = tv({
  base: "select",
  variants: {
    color: {
      default: "",
      neutral: "select-neutral",
      primary: "select-primary",
      secondary: "select-secondary",
      accent: "select-accent",
      info: "select-info",
      success: "select-success",
      warning: "select-warning",
      error: "select-error",
    },
    size: {
      xs: "select-xs",
      sm: "select-sm",
      md: "",
      lg: "select-lg",
      xl: "select-xl",
    },
    variant: {
      default: "",
      ghost: "select-ghost",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
});

type SelectVariants = Parameters<typeof selectVariants>[0];

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & SelectVariants;

export const Select = (props: SelectProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "variant",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <select
      {...others}
      class={selectVariants({
        color: local.color,
        size: local.size,
        variant: local.variant,
        class: local.class,
      })}
    >
      {safeChildren()}
    </select>
  );
};