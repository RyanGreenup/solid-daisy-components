import { tv } from "tailwind-variants";
import { splitProps, children, JSX, Show } from "solid-js";

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

export type HeroContentProps = JSX.HTMLAttributes<HTMLDivElement> & HeroContentVariants & {
  title?: string;
  description?: string;
};

export type HeroTitleProps = JSX.HTMLAttributes<HTMLHeadingElement> & HeroTitleVariants;

export type HeroDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement> & HeroDescriptionVariants;

export type HeroOverlayProps = JSX.HTMLAttributes<HTMLDivElement> & HeroOverlayVariants;

export const HeroTitle = (props: HeroTitleProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <h1
      {...others}
      class={heroTitleVariants({ class: local.class })}
    >
      {safeChildren()}
    </h1>
  );
};

export const HeroDescription = (props: HeroDescriptionProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <p
      {...others}
      class={heroDescriptionVariants({ class: local.class })}
    >
      {safeChildren()}
    </p>
  );
};

export const HeroContent = (props: HeroContentProps) => {
  const [local, others] = splitProps(props, ["class", "children", "title", "description"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={heroContentVariants({ class: local.class })}
    >
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

export const HeroOverlay = (props: HeroOverlayProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={heroOverlayVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

const HeroComponent = (props: HeroProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={heroVariants({ class: local.class })}
    >
      {safeChildren()}
    </div>
  );
};

export const Hero = Object.assign(HeroComponent, {
  Content: HeroContent,
  Title: HeroTitle,
  Description: HeroDescription,
  Overlay: HeroOverlay,
});