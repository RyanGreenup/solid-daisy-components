import { Show, children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const filterVariants = tv({
  base: "filter",
});

export const filterResetVariants = tv({
  base: "filter-reset",
});

type FilterVariants = Parameters<typeof filterVariants>[0];
type FilterResetVariants = Parameters<typeof filterResetVariants>[0];

type FilterDivProps = JSX.HTMLAttributes<HTMLDivElement> & FilterVariants & { as?: "div" };
type FilterFormProps = JSX.FormHTMLAttributes<HTMLFormElement> & FilterVariants & { as: "form" };

export type FilterProps = FilterDivProps | FilterFormProps;

export type FilterResetProps = JSX.InputHTMLAttributes<HTMLInputElement> & FilterResetVariants;

export type FilterInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

/**
 * A DaisyUI filter-reset button rendered as `<input type="radio">` with `btn filter-reset`
 * classes. Place inside a `Filter` to allow users to clear all active filter selections.
 */
export const FilterReset = (props: FilterResetProps) => {
  const [local, others] = splitProps(props, ["class", "type"]);

  return (
    <input
      {...others}
      type={local.type || "radio"}
      class={`btn ${filterResetVariants({ class: local.class })}`}
    />
  );
};

/**
 * An individual filter option rendered as `<input type="radio">` with `btn` styling.
 * Place inside a `Filter` container; each instance represents a selectable filter value.
 */
export const FilterInput = (props: FilterInputProps) => {
  const [local, others] = splitProps(props, ["class", "type"]);

  return <input {...others} type={local.type || "radio"} class={`btn ${local.class || ""}`} />;
};

function FilterAsForm(props: FilterFormProps) {
  const [local, others] = splitProps(props, ["as", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <form {...others} class={filterVariants({ class: local.class })}>
      {safeChildren()}
    </form>
  );
}

function FilterAsDiv(props: FilterDivProps) {
  const [local, others] = splitProps(props, ["as", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={filterVariants({ class: local.class })}>
      {safeChildren()}
    </div>
  );
}

const FilterComponent = (props: FilterProps) => (
  <Show when={props.as === "form"} fallback={<FilterAsDiv {...(props as FilterDivProps)} />}>
    <FilterAsForm {...(props as FilterFormProps)} />
  </Show>
);

export const Filter = Object.assign(FilterComponent, {
  Input: FilterInput,
  Reset: FilterReset,
});
