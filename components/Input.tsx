import { tv } from "tailwind-variants";
import { splitProps, JSX, createSignal, createEffect } from "solid-js";

export const inputVariants = tv({
  base: "input",
  variants: {
    variant: {
      default: "",
      ghost: "input-ghost",
    },
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
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    size: "md",
  },
});

type InputVariants = Parameters<typeof inputVariants>[0];

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  InputVariants & {
    value?: string;
    onValueChange?: (value: string) => void;
  };

export const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "color",
    "size",
    "class",
    "value",
    "onValueChange",
    "onInput",
  ]);

  const [internalValue, setInternalValue] = createSignal(local.value || "");

  createEffect(() => {
    if (local.value !== undefined) {
      setInternalValue(local.value);
    }
  });

  const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    const newValue = e.currentTarget.value;
    setInternalValue(newValue);
    local.onValueChange?.(newValue);
    if (typeof local.onInput === "function") {
      local.onInput(e);
    }
  };

  return (
    <input
      {...others}
      value={internalValue()}
      onInput={handleInput}
      class={
        inputVariants({
          variant: local.variant,
          color: local.color,
          size: local.size,
        }) +
        " " +
        local.class
      }
    />
  );
};
