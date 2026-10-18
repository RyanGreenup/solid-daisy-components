import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

export const breadcrumbsVariants: TVReturnType<
  {}, undefined, "breadcrumbs", {}, undefined
> = tv<
  {}, [], {}, "breadcrumbs", undefined, undefined, {}, undefined
>({
  base: "breadcrumbs",
});

export type BreadcrumbsProps = JSX.HTMLAttributes<HTMLDivElement>;

export type BreadcrumbsItemProps = JSX.LiHTMLAttributes<HTMLLIElement>;

/**
 * An individual `<li>` item inside a `Breadcrumbs` container. Typically wraps
 * an anchor or plain text to represent one level of the navigation hierarchy.
 */
export const BreadcrumbsItem = (props: BreadcrumbsItemProps): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li {...others} class={local.class}>
      {safeChildren()}
    </li>
  );
};

const BreadcrumbsComponent = (props: BreadcrumbsProps): JSX.Element => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={breadcrumbsVariants({ class: local.class })}>
      <ul>{safeChildren()}</ul>
    </div>
  );
};

export const Breadcrumbs: typeof BreadcrumbsComponent & {
  Item: typeof BreadcrumbsItem;
} = Object.assign(BreadcrumbsComponent, {
  Item: BreadcrumbsItem,
});
