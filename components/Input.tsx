import { createEffect, createSignal, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type InputVariantsSchema = {
  color: Record<"accent" | "default" | "error" | "info" | "neutral" | "primary" | "secondary" | "success" | "warning", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
  variant: Record<"default" | "ghost", string>;
};

export const inputVariants: TVReturnType<
  InputVariantsSchema, undefined, "input", InputVariantsSchema, undefined
> = tv<
  InputVariantsSchema, [], {}, "input", undefined, undefined, InputVariantsSchema, undefined
>({
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

type InputVariants = Parameters<typeof inputVariants>[0];

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  InputVariants & {
    value?: string;
    onValueChange?: (value: string) => void;
  };

/**
 * A DaisyUI-styled text `<input>` with controlled value management.
 * Accepts an optional `onValueChange` callback that receives the new string value on each
 * keystroke, and keeps an internal signal in sync with the `value` prop via a `createEffect`.
 * Supports `color`, `size`, and `variant` (default, ghost) variant props.
 */
export const Input = (props: InputProps): JSX.Element => {
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
      local.onInput(
        e as InputEvent & {
          currentTarget: HTMLInputElement;
          target: HTMLInputElement;
        },
      );
    }
  };

  return (
    <input
      {...others}
      value={internalValue()}
      onInput={handleInput}
      class={`${inputVariants({
        color: local.color,
        size: local.size,
        variant: local.variant,
      })} ${local.class}`}
    />
  );
};
