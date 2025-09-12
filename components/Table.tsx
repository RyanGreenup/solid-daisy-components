import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const tableVariants = tv({
  base: "table",
  variants: {
    size: {
      xs: "table-xs",
      sm: "table-sm",
      md: "",
      lg: "table-lg",
      xl: "table-xl",
    },
    zebra: {
      false: "",
      true: "table-zebra",
    },
    pinRows: {
      false: "",
      true: "table-pin-rows",
    },
    pinCols: {
      false: "",
      true: "table-pin-cols",
    },
  },
  defaultVariants: {
    size: "md",
    zebra: false,
    pinRows: false,
    pinCols: false,
  },
});

type TableVariants = Parameters<typeof tableVariants>[0];

export type TableProps = JSX.TableHTMLAttributes<HTMLTableElement> & TableVariants;

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
        size: local.size,
        zebra: local.zebra,
        pinRows: local.pinRows,
        pinCols: local.pinCols,
        class: local.class,
      })}
    >
      {safeChildren()}
    </table>
  );
};