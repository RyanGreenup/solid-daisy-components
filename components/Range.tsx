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
  wheelToChange?: boolean;
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
    "onWheel",
    "wheelToChange",
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

  const handleWheel = (e: WheelEvent) => {
    const shouldHandleWheel = local.wheelToChange !== false;
    
    if (shouldHandleWheel) {
      e.preventDefault();
      
      const target = e.target as HTMLInputElement;
      const min = Number(target.min) || 0;
      const max = Number(target.max) || 100;
      const step = Number(target.step) || 1;
      
      const currentValue = local.valueSignal ? local.valueSignal[0]() : Number(target.value);
      const direction = e.deltaY > 0 ? -1 : 1;
      const newValue = Math.min(max, Math.max(min, currentValue + (direction * step)));
      
      if (local.valueSignal) {
        local.valueSignal[1](newValue);
      } else {
        target.value = String(newValue);
        const syntheticEvent = new Event('input', { bubbles: true });
        target.dispatchEvent(syntheticEvent);
      }
      
      if (local.onChange) {
        const syntheticChangeEvent = new Event('change', { bubbles: true }) as Event & { target: HTMLInputElement };
        Object.defineProperty(syntheticChangeEvent, 'target', { value: target, enumerable: true });
        local.onChange(syntheticChangeEvent);
      }
    }
    
    if (local.onWheel) {
      local.onWheel(e);
    }
  };

  return (
    <input
      {...others}
      type="range"
      value={local.valueSignal ? local.valueSignal[0]() : others.value}
      onInput={handleInput}
      onChange={handleChange}
      onWheel={handleWheel}
      class={rangeVariants({
        color: local.color,
        size: local.size,
        class: local.class,
      })}
    />
  );
};