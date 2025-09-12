import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

export const filterVariants = tv({
  base: "filter",
});

export const filterResetVariants = tv({
  base: "filter-reset",
});

type FilterVariants = Parameters<typeof filterVariants>[0];
type FilterResetVariants = Parameters<typeof filterResetVariants>[0];

export type FilterProps = JSX.HTMLAttributes<HTMLDivElement | HTMLFormElement> & FilterVariants & {
  as?: "form" | "div";
};

export type FilterResetProps = JSX.InputHTMLAttributes<HTMLInputElement> & FilterResetVariants;

export type FilterInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

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

export const FilterInput = (props: FilterInputProps) => {
  const [local, others] = splitProps(props, ["class", "type"]);

  return (
    <input
      {...others}
      type={local.type || "radio"}
      class={`btn ${local.class || ""}`}
    />
  );
};

const FilterComponent = (props: FilterProps) => {
  const [local, others] = splitProps(props, ["as", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <Dynamic
      component={local.as || "div"}
      {...others}
      class={filterVariants({ class: local.class })}
    >
      {safeChildren()}
    </Dynamic>
  );
};

export const Filter = Object.assign(FilterComponent, {
  Reset: FilterReset,
  Input: FilterInput,
});