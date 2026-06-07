import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const fieldsetVariants = tv({
  base: "fieldset",
});

export const fieldsetLegendVariants = tv({
  base: "fieldset-legend",
});

export const labelVariants = tv({
  base: "label",
});

type FieldsetVariants = Parameters<typeof fieldsetVariants>[0];
type FieldsetLegendVariants = Parameters<typeof fieldsetLegendVariants>[0];
type LabelVariants = Parameters<typeof labelVariants>[0];

export type FieldsetProps = JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> & FieldsetVariants;

export type FieldsetLegendProps = JSX.HTMLAttributes<HTMLLegendElement> & FieldsetLegendVariants;

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & LabelVariants;

/**
 * A DaisyUI-styled `<legend>` element for use inside a `Fieldset`.
 * Applies the `fieldset-legend` base class and forwards all standard legend HTML attributes.
 */
export const FieldsetLegend = (props: FieldsetLegendProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <legend {...others} class={fieldsetLegendVariants({ class: local.class })}>
      {safeChildren()}
    </legend>
  );
};

/**
 * A DaisyUI-styled `<label>` element applying the `label` base class.
 * Use to annotate form controls inside a `Fieldset`; forwards all standard label attributes.
 */
export const Label = (props: LabelProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <label {...others} class={labelVariants({ class: local.class })}>
      {safeChildren()}
    </label>
  );
};

const FieldsetComponent = (props: FieldsetProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <fieldset {...others} class={fieldsetVariants({ class: local.class })}>
      {safeChildren()}
    </fieldset>
  );
};

export const Fieldset = Object.assign(FieldsetComponent, {
  Legend: FieldsetLegend,
});
