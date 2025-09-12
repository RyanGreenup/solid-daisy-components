import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const cardVariants = tv({
  base: "card",
  variants: {
    size: {
      xs: "card-xs",
      sm: "card-sm",
      md: "",
      lg: "card-lg",
      xl: "card-xl",
    },
    border: {
      default: "",
      border: "card-border",
      dash: "card-dash",
    },
    side: {
      default: "",
      side: "card-side",
    },
    image: {
      default: "",
      full: "image-full",
    },
  },
  defaultVariants: {
    size: "md",
    border: "default",
    side: "default",
    image: "default",
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
  variants: {
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    justify: "end",
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

export const CardBody = (props: CardBodyProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={cardBodyVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

export const CardTitle = (props: CardTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <h2
      {...others}
      class={cardTitleVariants({ class: local.class })}
    >
      {safeChildren()}
    </h2>
  );
};

export const CardActions = (props: CardActionsProps) => {
  const [local, others] = splitProps(props, ["justify", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={cardActionsVariants({
        justify: local.justify,
        class: local.class,
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
        size: local.size,
        border: local.border,
        side: local.side,
        image: local.image,
        class: local.class,
      })}
    >
      {safeChildren()}
    </div>
  );
};

export const Card = Object.assign(CardComponent, {
  Body: CardBody,
  Title: CardTitle,
  Actions: CardActions,
});