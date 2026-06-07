import { splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const skeletonVariants = tv({
  base: "skeleton",
});

type SkeletonVariants = Parameters<typeof skeletonVariants>[0];

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonVariants;

/**
 * A placeholder `<div>` with the DaisyUI `skeleton` class, used to indicate
 * loading content via an animated shimmer effect. Size and shape are controlled
 * via standard HTML class/style props.
 */
export const Skeleton = (props: SkeletonProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      {...others}
      class={skeletonVariants({
        class: local.class,
      })}
    />
  );
};
