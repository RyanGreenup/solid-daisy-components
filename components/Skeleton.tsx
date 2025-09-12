import { tv } from "tailwind-variants";
import { splitProps, JSX } from "solid-js";

export const skeletonVariants = tv({
  base: "skeleton",
});

type SkeletonVariants = Parameters<typeof skeletonVariants>[0];

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement> & SkeletonVariants;

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