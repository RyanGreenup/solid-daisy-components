import { tv } from "tailwind-variants";
import { splitProps, JSX, Accessor, Setter } from "solid-js";

export const rangeVariants = tv({
  base: "range",
  variants: {
    color: {
      default: "",
      neutral: "range-neutral",
      primary: "range-primary",
      secondary: "range-secondary",
      accent: "range-accent",
      success: "range-success",
      warning: "range-warning",
      info: "range-info",
      error: "range-error",
    },
    size: {
      xs: "range-xs",
      sm: "range-sm",
      md: "",
      lg: "range-lg",
      xl: "range-xl",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

type RangeVariants = Parameters<typeof rangeVariants>[0];

export type RangeProps = JSX.InputHTMLAttributes<HTMLInputElement> & RangeVariants & {
  valueSignal?: [Accessor<number>, Setter<number>];
};

export const Range = (props: RangeProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "size",
    "class",
    "type",
    "valueSignal",
    "onInput",
    "onChange",
  ]);

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const numValue = Number(target.value);
    
    if (local.valueSignal) {
      local.valueSignal[1](numValue);
    }
    
    if (local.onInput) {
      local.onInput(e as InputEvent);
    }
  };

  const handleChange = (e: Event) => {
    if (local.onChange) {
      local.onChange(e as Event & { target: HTMLInputElement });
    }
  };

  return (
    <input
      {...others}
      type="range"
      value={local.valueSignal ? local.valueSignal[0]() : others.value}
      onInput={handleInput}
      onChange={handleChange}
      class={rangeVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};