import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const badgeVariants = tv({
  base: "badge",
  variants: {
    variant: {
      default: "",
      outline: "badge-outline",
      soft: "badge-soft",
      dash: "badge-dash",
      ghost: "badge-ghost",
    },
    color: {
      default: "",
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
    },
    size: {
      xs: "badge-xs",
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
      xl: "badge-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    size: "md",
  },
});

type BadgeVariants = Parameters<typeof badgeVariants>[0];

export type BadgeProps = JSX.HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export const Badge = (props: BadgeProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "color",
    "size",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <span
      {...others}
      class={badgeVariants({
        variant: local.variant,
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    >
      {safeChildren()}
    </span>
  );
};
