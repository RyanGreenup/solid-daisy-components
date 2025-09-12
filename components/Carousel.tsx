import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const carouselVariants = tv({
  base: "carousel",
  variants: {
    snap: {
      start: "carousel-start",
      center: "carousel-center",
      end: "carousel-end",
    },
    direction: {
      horizontal: "",
      vertical: "carousel-vertical",
    },
  },
  defaultVariants: {
    snap: "start",
    direction: "horizontal",
  },
});

export const carouselItemVariants = tv({
  base: "carousel-item",
});

type CarouselVariants = Parameters<typeof carouselVariants>[0];
type CarouselItemVariants = Parameters<typeof carouselItemVariants>[0];

export type CarouselProps = JSX.HTMLAttributes<HTMLDivElement> & CarouselVariants;

export type CarouselItemProps = JSX.HTMLAttributes<HTMLDivElement> & CarouselItemVariants;

export const CarouselItem = (props: CarouselItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={carouselItemVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

const CarouselComponent = (props: CarouselProps) => {
  const [local, others] = splitProps(props, [
    "snap",
    "direction",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={carouselVariants({
        snap: local.snap,
        direction: local.direction,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Carousel = Object.assign(CarouselComponent, {
  Item: CarouselItem,
});