import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const tableVariants = tv({
  base: "table",
  defaultVariants: {
    pinCols: false,
    pinRows: false,
    size: "md",
    zebra: false,
  },
  variants: {
    pinCols: {
      false: "",
      true: "table-pin-cols",
    },
    pinRows: {
      false: "",
      true: "table-pin-rows",
    },
    size: {
      lg: "table-lg",
      md: "",
      sm: "table-sm",
      xl: "table-xl",
      xs: "table-xs",
    },
    zebra: {
      false: "",
      true: "table-zebra",
    },
  },
});

type TableVariants = Parameters<typeof tableVariants>[0];

export type TableProps = JSX.HTMLAttributes<HTMLTableElement> & TableVariants;

/**
 * A styled `<table>` using DaisyUI table classes. Supports `size` (xs–xl),
 * `zebra` striping, and `pinRows`/`pinCols` for sticky headers and columns.
 */
export const Table = (props: TableProps) => {
  const [local, others] = splitProps(props, [
    "size",
    "zebra",
    "pinRows",
    "pinCols",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <table
      {...others}
      class={tableVariants({
        class: local.class,
        pinCols: local.pinCols,
        pinRows: local.pinRows,
        size: local.size,
        zebra: local.zebra,
      })}
    >
      {safeChildren()}
    </table>
  );
};
