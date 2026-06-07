import { createSignal, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { Accessor, JSX, Setter } from "solid-js";

export const rangeVariants = tv({
  base: "range",
  defaultVariants: {
    color: "default",
    size: "md",
  },
  variants: {
    color: {
      accent: "range-accent",
      default: "",
      error: "range-error",
      info: "range-info",
      neutral: "range-neutral",
      primary: "range-primary",
      secondary: "range-secondary",
      success: "range-success",
      warning: "range-warning",
    },
    size: {
      lg: "range-lg",
      md: "",
      sm: "range-sm",
      xl: "range-xl",
      xs: "range-xs",
    },
  },
});

type RangeVariants = Parameters<typeof rangeVariants>[0];

export type RangeProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  RangeVariants & {
    valueSignal?: [Accessor<number>, Setter<number>];
    wheelToChange?: boolean;
  };

/**
 * A DaisyUI-styled range slider rendered as `<input type="range">` with optional reactive
 * value binding via `valueSignal` and mouse-wheel stepping support via `wheelToChange`.
 * Supports `color` and `size` variant props; wheel input accumulates delta before stepping
 * to avoid overly sensitive scrolling.
 */
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

  const [wheelAccumulator, setWheelAccumulator] = createSignal(0);
  const WHEEL_THRESHOLD = 50; // Require 50 deltaY units before triggering a step

  const handleInput: JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent> = (e) => {
    const target = e.target as HTMLInputElement;
    const numValue = Number(target.value);

    if (local.valueSignal) {
      local.valueSignal[1](numValue);
    }

    if (typeof local.onInput === "function") {
      local.onInput(e);
    }
  };

  const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    if (typeof local.onChange === "function") {
      local.onChange(e);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    const shouldHandleWheel = local.wheelToChange !== false;

    if (shouldHandleWheel) {
      e.preventDefault();

      // Accumulate wheel delta until threshold is reached
      const newAccumulator = wheelAccumulator() + Math.abs(e.deltaY);

      if (newAccumulator >= WHEEL_THRESHOLD) {
        // Reset accumulator and trigger value change
        setWheelAccumulator(0);

        const target = e.target as HTMLInputElement;
        const min = Number(target.min) || 0;
        const max = Number(target.max) || 100;
        const step = Number(target.step) || 1;

        const currentValue = local.valueSignal ? local.valueSignal[0]() : Number(target.value);
        const direction = e.deltaY > 0 ? -1 : 1;
        const newValue = Math.min(max, Math.max(min, currentValue + direction * step));

        if (local.valueSignal) {
          local.valueSignal[1](newValue);
        } else {
          target.value = String(newValue);
          const syntheticEvent = new Event("input", { bubbles: true });
          target.dispatchEvent(syntheticEvent);
        }

        if (typeof local.onChange === "function") {
          const syntheticChangeEvent = new Event("change", {
            bubbles: true,
          }) as Event & {
            currentTarget: HTMLInputElement;
            target: HTMLInputElement;
          };
          Object.defineProperty(syntheticChangeEvent, "target", {
            enumerable: true,
            value: target,
          });
          Object.defineProperty(syntheticChangeEvent, "currentTarget", {
            enumerable: true,
            value: target,
          });
          local.onChange(syntheticChangeEvent);
        }
      } else {
        // Store accumulated wheel delta
        setWheelAccumulator(newAccumulator);
      }
    }

    if (typeof local.onWheel === "function") {
      local.onWheel(e as WheelEvent & { currentTarget: HTMLInputElement; target: Element });
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
        class: local.class,
        color: local.color,
        size: local.size,
      })}
    />
  );
};
