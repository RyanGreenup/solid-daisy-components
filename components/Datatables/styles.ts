import { tv } from "tailwind-variants";

export const sortButtonVariants = tv({
  base: "flex items-center gap-1 bg-transparent cursor-pointer text-sm font-semibold text-base-content whitespace-nowrap w-full px-4 pt-2 transition-all duration-300 ease-in-out hover:text-base-content/80 hover:scale-105 disabled:cursor-not-allowed disabled:text-base-content/40",
});

export const dataTableVariants = tv({
  slots: {
    container: "bg-base-200 rounded-box border border-base-300 shadow-sm",
    outerHeader: "p-4 rounded-box",
    globalSearchInput: "w-full max-w-xs",
    table: "w-full border-separate border-spacing-0",
    header: "w-full block",
    body: "bg-base-100 block overflow-auto relative",
    row: [
      "transition-colors duration-300 hover:bg-base-200/50",

      // Re-apply the background color
      "bg-base-100",
    ],
    cell: "px-4 py-3 flex items-center",
    tr: "flex w-full",
    th: "px-4 py-3 text-left text-sm font-semibold text-base-content flex items-center border-b border-base-300",
    outerFooter:
      "px-4 py-3 border-t border-base-300 bg-base-200 text-sm text-base-content text-center rounded-b-box",
  },
  variants: {
    justifyColumns: {
      true: {
        tr: " justify-between",
        row: "justify-between",
      },
    },
    darkHeader: {
      true: {
        outerHeader: "bg-base-200",
        header: "bg-base-200",
      },
      false: {
        outerHeader: "bg-base-100",
        header: "bg-base-100",
      },
    },
    striped: {
      true: {
        row: "even:bg-base-100 odd:bg-base-200/30",
      },
      false: {
        row: "bg-base-100",
      },
    },
    horizontalBorder: {
      true: {
        row: "border-b border-base-300",
      },
    },
    verticalBorders: {
      true: {
        outerHeader: "bg-base-200 border-b border-base-300",
        header: "bg-base-200",
        cell: "border-r border-base-300 last:border-r-0",
        th: "border-r border-base-300 last:border-r-0",
      },
    },
    noFooter: {
      true: {
        outerFooter: "hidden",
      },
    },
    noHeader: {
      true: {
        outerHeader: "hidden",
      },
    },
  },
  defaultVariants: {
    darkHeader: true,
    horizontalBorder: true,
    justifyColumns: true,
  },
});

export type DataTableVariants = Parameters<typeof dataTableVariants>[0];
