import { tv } from "tailwind-variants";

export const sortButtonVariants = tv({
  base: "flex items-center gap-1 bg-transparent cursor-pointer text-sm font-semibold text-base-content whitespace-nowrap w-full px-4 pt-2 transition-all duration-300 ease-in-out hover:text-base-content/80 hover:scale-105 disabled:cursor-not-allowed disabled:text-base-content/40",
});

export const dataTableVariants = tv({
  defaultVariants: {
    darkHeader: true,
    horizontalBorder: true,
    justifyColumns: true,
  },
  slots: {
    body: "bg-base-100 block overflow-auto relative",
    cell: "px-4 py-3 flex items-center",
    container: "bg-base-200 rounded-box border border-base-300 shadow-sm",
    globalSearchInput: "w-full max-w-xs",
    header: "w-full block",
    outerFooter:
      "px-4 py-3 border-t border-base-300 bg-base-200 text-sm text-base-content text-center rounded-b-box",
    outerHeader: "p-4 rounded-box",
    row: [
      "transition-colors duration-300 hover:bg-base-200/50",

      // Re-apply the background color
      "bg-base-100",
    ],
    table: "w-full border-separate border-spacing-0",
    th: "px-4 py-3 text-left text-sm font-semibold text-base-content flex items-center border-b border-base-300",
    tr: "flex w-full",
  },
  variants: {
    darkHeader: {
      false: {
        header: "bg-base-100",
        outerHeader: "bg-base-100",
      },
      true: {
        header: "bg-base-200",
        outerHeader: "bg-base-200",
      },
    },
    horizontalBorder: {
      true: {
        row: "border-b border-base-300",
      },
    },
    justifyColumns: {
      true: {
        row: "justify-between",
        tr: "justify-between",
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
    striped: {
      false: {
        row: "bg-base-100",
      },
      true: {
        row: "even:bg-base-100 odd:bg-base-200/30",
      },
    },
    verticalBorders: {
      true: {
        cell: "border-r border-base-300 last:border-r-0",
        header: "bg-base-200",
        outerHeader: "bg-base-200 border-b border-base-300",
        th: "border-r border-base-300 last:border-r-0",
      },
    },
  },
});

export type DataTableVariants = Parameters<typeof dataTableVariants>[0];
