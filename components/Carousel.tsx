import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const carouselVariants = tv({
  base: "carousel",
  defaultVariants: {
    direction: "horizontal",
    snap: "start",
  },
  variants: {
    direction: {
      horizontal: "",
      vertical: "carousel-vertical",
    },
    snap: {
      center: "carousel-center",
      end: "carousel-end",
      start: "carousel-start",
    },
  },
});

export const carouselItemVariants = tv({
  base: "carousel-item",
});

type CarouselVariants = Parameters<typeof carouselVariants>[0];
type CarouselItemVariants = Parameters<typeof carouselItemVariants>[0];

export type CarouselProps = JSX.HTMLAttributes<HTMLDivElement> & CarouselVariants;

export type CarouselItemProps = JSX.HTMLAttributes<HTMLDivElement> & CarouselItemVariants;

/**
 * Individual slide inside a `Carousel`; applies the DaisyUI `carousel-item` class and
 * forwards all HTML div attributes.
 */
export const CarouselItem = (props: CarouselItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={carouselItemVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

const CarouselComponent = (props: CarouselProps) => {
  const [local, others] = splitProps(props, ["snap", "direction", "class", "children"]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={carouselVariants({
        class: local.class,
        direction: local.direction,
        snap: local.snap,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Carousel = Object.assign(CarouselComponent, {
  Item: CarouselItem,
});
