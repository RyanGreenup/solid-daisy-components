import { Show, children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const heroVariants = tv({
  base: "hero",
});

export const heroContentVariants = tv({
  base: "hero-content",
});

export const heroTitleVariants = tv({
  base: "text-5xl font-bold",
});

export const heroDescriptionVariants = tv({
  base: "py-6",
});

export const heroOverlayVariants = tv({
  base: "hero-overlay",
});

type HeroVariants = Parameters<typeof heroVariants>[0];
type HeroContentVariants = Parameters<typeof heroContentVariants>[0];
type HeroTitleVariants = Parameters<typeof heroTitleVariants>[0];
type HeroDescriptionVariants = Parameters<typeof heroDescriptionVariants>[0];
type HeroOverlayVariants = Parameters<typeof heroOverlayVariants>[0];

export type HeroProps = JSX.HTMLAttributes<HTMLDivElement> & HeroVariants;

export type HeroContentProps = JSX.HTMLAttributes<HTMLDivElement> &
  HeroContentVariants & {
    title?: string;
    description?: string;
  };

export type HeroTitleProps = JSX.HTMLAttributes<HTMLHeadingElement> & HeroTitleVariants;

export type HeroDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement> &
  HeroDescriptionVariants;

export type HeroOverlayProps = JSX.HTMLAttributes<HTMLDivElement> & HeroOverlayVariants;

/**
 * Large heading for a DaisyUI hero section, rendered as an `<h1>` with
 * `text-5xl font-bold` typography classes.
 */
export const HeroTitle = (props: HeroTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <h1 {...others} class={heroTitleVariants({ class: local.class })}>
      {safeChildren()}
    </h1>
  );
};

/**
 * Body-text paragraph for a DaisyUI hero section, rendered as a `<p>` with
 * `py-6` spacing to provide vertical breathing room below the hero title.
 */
export const HeroDescription = (props: HeroDescriptionProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <p {...others} class={heroDescriptionVariants({ class: local.class })}>
      {safeChildren()}
    </p>
  );
};

/**
 * Central content area of a DaisyUI hero, rendered as a `<div>` with
 * `hero-content`. When `title` or `description` props are supplied it wraps
 * them in a `max-w-md` container alongside any child nodes; otherwise it
 * renders children directly.
 */
export const HeroContent = (props: HeroContentProps) => {
  const [local, others] = splitProps(props, ["class", "children", "title", "description"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={heroContentVariants({ class: local.class })}>
      <Show when={local.title || local.description} fallback={safeChildren()}>
        <div class="max-w-md">
          <Show when={local.title}>
            <HeroTitle>{local.title}</HeroTitle>
          </Show>
          <Show when={local.description}>
            <HeroDescription>{local.description}</HeroDescription>
          </Show>
          {safeChildren()}
        </div>
      </Show>
    </div>
  );
};

/**
 * Semi-transparent overlay `<div>` for a DaisyUI hero with a background image.
 * Applies the `hero-overlay` class to darken the background and improve
 * readability of content placed on top.
 */
export const HeroOverlay = (props: HeroOverlayProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={heroOverlayVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

const HeroComponent = (props: HeroProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={heroVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
};

export const Hero = Object.assign(HeroComponent, {
  Content: HeroContent,
  Description: HeroDescription,
  Overlay: HeroOverlay,
  Title: HeroTitle,
});
