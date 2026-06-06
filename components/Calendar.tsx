import { splitProps, children, ComponentProps, onMount } from "solid-js";
import { tv } from "tailwind-variants";

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
