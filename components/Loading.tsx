import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const loadingVariants = tv({
  base: "loading",
  variants: {
    variant: {
      spinner: "loading-spinner",
      dots: "loading-dots",
      ring: "loading-ring",
      ball: "loading-ball",
      bars: "loading-bars",
      infinity: "loading-infinity",
    },
    size: {
      xs: "loading-xs",
      sm: "loading-sm",
      md: "",
      lg: "loading-lg",
      xl: "loading-xl",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "md",
  },
});

type LoadingVariants = Parameters<typeof loadingVariants>[0];

export type LoadingProps = JSX.HTMLAttributes<HTMLSpanElement> & LoadingVariants;

export const Loading = (props: LoadingProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "size",
    "class",
  ]);

  return (
    <span
      {...others}
      class={loadingVariants({
        variant: local.variant,
        size: local.size,
        class: local.class,
      })}
    />
  );
};