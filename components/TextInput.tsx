import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const textInputVariants = tv({
  base: "input",
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
  },
  variants: {
    color: {
      accent: "input-accent",
      default: "",
      error: "input-error",
      info: "input-info",
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      success: "input-success",
      warning: "input-warning",
    },
    size: {
      lg: "input-lg",
      md: "",
      sm: "input-sm",
      xl: "input-xl",
      xs: "input-xs",
    },
    variant: {
      default: "",
      ghost: "input-ghost",
    },
  },
});

export const inputWrapperVariants = tv({
  base: "input",
});

type TextInputVariants = Parameters<typeof textInputVariants>[0];
type InputWrapperVariants = Parameters<typeof inputWrapperVariants>[0];

export type TextInputProps = JSX.InputHTMLAttributes<HTMLInputElement> & TextInputVariants;

export type InputWrapperProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & InputWrapperVariants;

const TextInputComponent = (props: TextInputProps) => {
  const [local, others] = splitProps(props, ["color", "size", "variant", "class"]);

  return (
    <input
      {...others}
      class={textInputVariants({
        class: local.class,
        color: local.color,
        size: local.size,
        variant: local.variant,
      })}
    />
  );
};

/**
 * A DaisyUI `input`-styled `<label>` wrapper used to compose composite input fields
 * (e.g. icon + input side-by-side). Wrap a `TextInput` and any decorating elements
 * inside this component to apply the shared `input` border/background styling to the group.
 */
export const InputWrapper = (props: InputWrapperProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <label {...others} class={inputWrapperVariants({ class: local.class })}>
      {safeChildren()}
    </label>
  );
};

export const TextInput = Object.assign(TextInputComponent, {
  Wrapper: InputWrapper,
});
