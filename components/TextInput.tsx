import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const textInputVariants = tv({
  base: "input",
  variants: {
    color: {
      default: "",
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      accent: "input-accent",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    },
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "",
      lg: "input-lg",
      xl: "input-xl",
    },
    variant: {
      default: "",
      ghost: "input-ghost",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
    variant: "default",
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
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "variant",
    "class",
  ]);

  return (
    <input
      {...others}
      class={textInputVariants({
        color: local.color,
        size: local.size,
        variant: local.variant,
        class: local.class,
      })}
    />
  );
};

export const InputWrapper = (props: InputWrapperProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <label
      {...others}
      class={inputWrapperVariants({ class: local.class })}
    >
      {safeChildren()}
    </label>
  );
};

export const TextInput = Object.assign(TextInputComponent, {
  Wrapper: InputWrapper,
});