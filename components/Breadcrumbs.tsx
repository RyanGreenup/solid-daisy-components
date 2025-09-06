import { tv } from "tailwind-variants";
import { splitProps, children, JSX, For, Show } from "solid-js";

export const breadcrumbsVariants = tv({
  base: "breadcrumbs",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type BreadcrumbsVariants = Parameters<typeof breadcrumbsVariants>[0];

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: JSX.Element;
};

export type BreadcrumbsProps = JSX.HTMLAttributes<HTMLDivElement> &
  BreadcrumbsVariants & {
    items?: BreadcrumbItem[];
    separator?: JSX.Element;
  };

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const [local, others] = splitProps(props, [
    "size",
    "class",
    "children",
    "items",
    "separator",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={breadcrumbsVariants({
        size: local.size,
        class: local.class,
      })}
    >
      <Show when={local.items} fallback={safeChildren()}>
        <ul>
          <For each={local.items}>
            {(item, index) => (
              <li>
                <Show
                  when={item.href}
                  fallback={
                    <>
                      {item.icon}
                      {item.label}
                    </>
                  }
                >
                  <a href={item.href}>
                    {item.icon}
                    {item.label}
                  </a>
                </Show>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};