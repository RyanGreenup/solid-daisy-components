import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const cardVariants = tv({
  base: "card",
  defaultVariants: {
    border: "default",
    image: "default",
    side: "default",
    size: "md",
  },
  variants: {
    border: {
      border: "card-border",
      dash: "card-dash",
      default: "",
    },
    image: {
      default: "",
      full: "image-full",
    },
    side: {
      default: "",
      side: "card-side",
    },
    size: {
      lg: "card-lg",
      md: "",
      sm: "card-sm",
      xl: "card-xl",
      xs: "card-xs",
    },
  },
});

export const cardBodyVariants = tv({
  base: "card-body",
});

export const cardTitleVariants = tv({
  base: "card-title",
});

export const cardActionsVariants = tv({
  base: "card-actions",
  defaultVariants: {
    justify: "end",
  },
  variants: {
    justify: {
      center: "justify-center",
      end: "justify-end",
      start: "justify-start",
    },
  },
});

type CardVariants = Parameters<typeof cardVariants>[0];
type CardBodyVariants = Parameters<typeof cardBodyVariants>[0];
type CardTitleVariants = Parameters<typeof cardTitleVariants>[0];
type CardActionsVariants = Parameters<typeof cardActionsVariants>[0];

export type CardProps = JSX.HTMLAttributes<HTMLDivElement> & CardVariants;

export type CardBodyProps = JSX.HTMLAttributes<HTMLDivElement> & CardBodyVariants;

export type CardTitleProps = JSX.HTMLAttributes<HTMLHeadingElement> & CardTitleVariants;

export type CardActionsProps = JSX.HTMLAttributes<HTMLDivElement> & CardActionsVariants;

/**
 * Container for the main content area of a DaisyUI card.
 * Renders a `<div>` with the `card-body` class, providing padded layout
 * for card content such as title, text, and actions.
 */
export const CardBody = (props: CardBodyProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={cardBodyVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

/**
 * Heading element for a DaisyUI card, rendered as an `<h2>` with the
 * `card-title` class to apply bold, large-text styling consistent with
 * the DaisyUI card design.
 */
export const CardTitle = (props: CardTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <h2 {...others} class={cardTitleVariants({ class: local.class })}>
      {safeChildren()}
    </h2>
  );
};

/**
 * Action button row for a DaisyUI card, rendered as a `<div>` with
 * `card-actions` and a configurable flex-justification (`start`, `center`,
 * or `end`; defaults to `end`) for aligning buttons and links.
 */
export const CardActions = (props: CardActionsProps) => {
  const [local, others] = splitProps(props, ["justify", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={cardActionsVariants({
        class: local.class,
        justify: local.justify,
      })}
    >
      {safeChildren()}
    </div>
  );
};

const CardComponent = (props: CardProps) => {
  const [local, others] = splitProps(props, [
    "size",
    "border",
    "side",
    "image",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={cardVariants({
        border: local.border,
        class: local.class,
        image: local.image,
        side: local.side,
        size: local.size,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Card = Object.assign(CardComponent, {
  Actions: CardActions,
  Body: CardBody,
  Title: CardTitle,
});
