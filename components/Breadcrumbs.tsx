import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const breadcrumbsVariants = tv({
  base: "breadcrumbs",
});

export type BreadcrumbsProps = JSX.HTMLAttributes<HTMLDivElement>;

export type BreadcrumbsItemProps = JSX.LiHTMLAttributes<HTMLLIElement>;

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li {...others} class={local.class}>
      {safeChildren()}
    </li>
  );
};

const BreadcrumbsComponent = (props: BreadcrumbsProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={breadcrumbsVariants({ class: local.class })}
    >
      <ul>{safeChildren()}</ul>
    </div>
  );
};

export const Breadcrumbs = Object.assign(BreadcrumbsComponent, {
  Item: BreadcrumbsItem,
});
