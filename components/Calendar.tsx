import { children, onMount, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { ComponentProps } from "solid-js";

export const calendarVariants = tv({
  base: "cally",
});

type CalendarVariants = Parameters<typeof calendarVariants>[0];

export type CalendarProps = ComponentProps<"div"> & CalendarVariants;

export type CalendarDateProps = ComponentProps<"div"> &
  CalendarVariants & {
    value?: string;
    min?: string;
    max?: string;
    onDateChange?: (value: string) => void;
  };

export type CalendarMonthProps = ComponentProps<"div">;

// Define types for the Cally web components
interface CalendarDateElementProps {
  value?: string;
  min?: string;
  max?: string;
  class?: string;
  children?: any;
  "on:change"?: (event: CustomEvent) => void;
}

interface CalendarMonthElementProps {
  class?: string;
  children?: any;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "calendar-date": CalendarDateElementProps;
      "calendar-month": CalendarMonthElementProps;
    }
  }
}

/**
 * Single-date picker backed by the `cally` web component (`<calendar-date>`), lazily
 * imported on mount. Accepts `value`, `min`, and `max` as ISO date strings and fires
 * `onDateChange` with the selected date string via a native `change` CustomEvent.
 */
export const CalendarDate = (props: CalendarDateProps) => {
  const [local] = splitProps(props, ["class", "children", "value", "min", "max", "onDateChange"]);

  const safeChildren = children(() => local.children);

  // Import Cally when component mounts
  onMount(async () => {
    await import("cally");
  });

  const handleChange = (event: CustomEvent) => {
    if (local.onDateChange) {
      local.onDateChange((event.target as HTMLInputElement).value);
    }
  };

  return (
    <calendar-date
      class={calendarVariants({ class: local.class })}
      value={local.value}
      min={local.min}
      max={local.max}
      on:change={handleChange}
    >
      {safeChildren()}
    </calendar-date>
  );
};

/**
 * Month grid slot for the `cally` calendar; renders a `<calendar-month>` web component
 * that displays one month's date grid inside a `CalendarDate` parent.
 */
export const CalendarMonth = (props: CalendarMonthProps) => {
  const [local] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return <calendar-month class={local.class}>{safeChildren()}</calendar-month>;
};

const CalendarComponent = CalendarDate;

export const Calendar = Object.assign(CalendarComponent, {
  Date: CalendarDate,
  Month: CalendarMonth,
});
