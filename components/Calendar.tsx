import { tv } from "tailwind-variants";
import { splitProps, children, JSX, onMount } from "solid-js";

export const calendarVariants = tv({
  base: "cally",
});

type CalendarVariants = Parameters<typeof calendarVariants>[0];

export type CalendarProps = JSX.HTMLAttributes<HTMLElement> & CalendarVariants;

export type CalendarDateProps = JSX.HTMLAttributes<HTMLElement> & CalendarVariants & {
  value?: string;
  min?: string;
  max?: string;
  onDateChange?: (value: string) => void;
};

export type CalendarMonthProps = JSX.HTMLAttributes<HTMLElement>;

// Define types for the Cally web components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'calendar-date': JSX.HTMLAttributes<HTMLElement> & {
        value?: string;
        min?: string;
        max?: string;
        'on:change'?: (event: CustomEvent) => void;
      };
      'calendar-month': JSX.HTMLAttributes<HTMLElement>;
    }
  }
}

export const CalendarDate = (props: CalendarDateProps) => {
  const [local, others] = splitProps(props, [
    "class",
    "children",
    "value",
    "min",
    "max",
    "onDateChange",
  ]);

  const safeChildren = children(() => local.children);

  // Import Cally when component mounts
  onMount(async () => {
    await import("cally");
  });

  const handleChange = (event: CustomEvent) => {
    if (local.onDateChange) {
      local.onDateChange(event.target.value);
    }
  };

  return (
    <calendar-date
      {...others}
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

export const CalendarMonth = (props: CalendarMonthProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <calendar-month
      {...others}
      class={local.class}
    >
      {safeChildren()}
    </calendar-month>
  );
};

const CalendarComponent = CalendarDate;

export const Calendar = Object.assign(CalendarComponent, {
  Date: CalendarDate,
  Month: CalendarMonth,
});