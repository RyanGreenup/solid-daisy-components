import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const loadingVariants = tv({
  base: "loading",
  defaultVariants: {
    size: "md",
    variant: "spinner",
  },
  variants: {
    size: {
      lg: "loading-lg",
      md: "",
      sm: "loading-sm",
      xl: "loading-xl",
      xs: "loading-xs",
    },
    variant: {
      ball: "loading-ball",
      bars: "loading-bars",
      dots: "loading-dots",
      infinity: "loading-infinity",
      ring: "loading-ring",
      spinner: "loading-spinner",
    },
  },
});

type LoadingVariants = Parameters<typeof loadingVariants>[0];

export type LoadingProps = JSX.HTMLAttributes<HTMLSpanElement> & LoadingVariants;

/**
 * A `<span>` rendered as a DaisyUI loading indicator. Use `variant` to choose
 * the animation style (spinner, dots, ring, ball, bars, infinity) and `size`
 * (xs–xl) to control its dimensions.
 */
export const Loading = (props: LoadingProps) => {
  const [local, others] = splitProps(props, ["variant", "size", "class"]);

  return (
    <span
      {...others}
      class={loadingVariants({
        class: local.class,
        size: local.size,
        variant: local.variant,
      })}
    />
  );
};
