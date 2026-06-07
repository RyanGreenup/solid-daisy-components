import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/solid-table";
import { createVirtualizer } from "@tanstack/solid-virtual";
import ChevronDown from "lucide-solid/icons/chevron-down";
import ChevronUp from "lucide-solid/icons/chevron-up";
import { For, Show, createMemo, createSignal } from "solid-js";

import DownloadButton from "../DownloadButton";
import { Input } from "../Input";
import { Select } from "../Select";
import { dataTableVariants, sortButtonVariants } from "./styles";

import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
} from "@tanstack/solid-table";
import type { JSXElement } from "solid-js";

import type { DataTableVariants } from "./styles";

declare module "@tanstack/solid-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select";
    selectOptions?: { value: string; label: string }[];
  }
}

type VirtualizedDataTableProps<T> = DataTableVariants & {
  data: T[];
  columns: ColumnDef<T>[];
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  enableDownload?: boolean;
  downloadFilename?: string;
  searchPlaceholder?: string;
  height?: string;
  estimateSize?: () => number;
  overscan?: number;
  class?: string;
};

function Filter<T>(props: { column: Column<T, unknown>; data: T[] }) {
  const columnFilterValue = () => props.column.getFilterValue();
  const { filterVariant, selectOptions } = props.column.columnDef.meta ?? {};

  if (filterVariant === "select") {
    const options = selectOptions || [];

    return (
      <Select
        size="sm"
        value={(columnFilterValue() as string) || ""}
        onChange={(e) => props.column.setFilterValue(e.currentTarget.value || undefined)}
        style={{ flex: "1" }}
      >
        <option value="">All</option>
        <For each={options}>{(option) => <option value={option.value}>{option.label}</option>}</For>
      </Select>
    );
  }

  return (
    <Input
      style={{ flex: "1", padding: "0.25rem" }}
      type="text"
      value={(columnFilterValue() as string) || ""}
      onInput={(e) => props.column.setFilterValue(e.currentTarget.value)}
      placeholder="Filter..."
    />
  );
}

/**
 * A data table with virtualized row rendering powered by TanStack Table and `@tanstack/solid-virtual`.
 * Supports optional global search, per-column filtering (text or select), column sorting, and CSV download.
 * Only visible rows are rendered in the DOM; configure row height via `estimateSize` and scroll area via `height`.
 * Visual appearance is controlled by `DataTableVariants` props (striped, darkHeader, verticalBorders, etc.).
 */
export function VirtualizedDataTable<T>(props: VirtualizedDataTableProps<T>): JSXElement {
  let parentRef: HTMLTableSectionElement | undefined;

  const styles = dataTableVariants({
    class: props.class,
    darkHeader: props.darkHeader,
    horizontalBorder: props.horizontalBorder,
    noFooter: props.noFooter,
    noHeader: props.noHeader,
    striped: props.striped,
    verticalBorders: props.verticalBorders,
  });

  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = createSignal("");

  const table = createSolidTable({
    get columns() {
      return props.columns;
    },
    get data() {
      return props.data;
    },
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:
      props.enableGlobalFilter !== false || props.enableColumnFilters !== false
        ? getFilteredRowModel()
        : getCoreRowModel(),
    getSortedRowModel: props.enableSorting !== false ? getSortedRowModel() : getCoreRowModel(),
    onColumnFiltersChange: props.enableColumnFilters !== false ? setColumnFilters : () => {},
    onGlobalFilterChange: props.enableGlobalFilter !== false ? setGlobalFilter : () => {},
    onSortingChange: props.enableSorting !== false ? setSorting : () => {},
    state: {
      get columnFilters() {
        return props.enableColumnFilters !== false ? columnFilters() : [];
      },
      get globalFilter() {
        return props.enableGlobalFilter !== false ? globalFilter() : "";
      },
      get sorting() {
        return props.enableSorting !== false ? sorting() : [];
      },
    },
  });

  const filteredRows = createMemo(() => {
    const { rows } = table.getRowModel();

    return rows;
  });

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      get count() {
        return filteredRows().length;
      },
      estimateSize: props.estimateSize || (() => 48),
      getScrollElement: () => parentRef!,
      overscan: props.overscan || 5,
    }),
  );

  return (
    <div class={styles.container()}>
      <Show when={props.enableGlobalFilter !== false || props.enableDownload !== false}>
        <div class={styles.outerHeader()}>
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Show when={props.enableGlobalFilter !== false}>
              <div class="flex-1 w-full sm:w-auto">
                <Input
                  value={globalFilter()}
                  onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                  placeholder={props.searchPlaceholder || "Search all columns..."}
                  class={styles.globalSearchInput()}
                />
              </div>
            </Show>
            <Show when={props.enableDownload !== false}>
              <DownloadButton
                data={() => {
                  const downloadData = filteredRows().map((row) => row.original);

                  return downloadData;
                }}
                columns={props.columns}
                filename={props.downloadFilename || "table-data.csv"}
              />
            </Show>
          </div>
        </div>
      </Show>

      <div
        style={{
          overflow: "scroll",
          "overflow-y": "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
          }}
          class={styles.table()}
        >
          <thead
            class={styles.header()}
            style={{
              display: "block",
              width: "100%",
            }}
          >
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <tr class={styles.tr()}>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <th
                        class={styles.th()}
                        style={{
                          flex: header.column.columnDef.size > 0 ? "none" : "1",
                          width:
                            header.column.columnDef.size > 0
                              ? `${header.column.columnDef.size}px`
                              : "auto",
                        }}
                      >
                        <Show
                          when={header.isPlaceholder}
                          fallback={
                            <div
                              style={{
                                display: "flex",
                                "flex-direction": "column",
                                // TODO Let's remove this and have the input automatically shrink to fit
                                // Probably need flex argument on the input
                                overflow: "hidden",
                                gap: "0.25rem",
                              }}
                            >
                              <button
                                class={sortButtonVariants()}
                                onClick={header.column.getToggleSortingHandler()}
                                disabled={
                                  !header.column.getCanSort() || props.enableSorting === false
                                }
                              >
                                <span>
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </span>
                                <Show
                                  when={
                                    props.enableSorting !== false &&
                                    header.column.getIsSorted() === "asc"
                                  }
                                >
                                  <ChevronUp size={16} />
                                </Show>
                                <Show
                                  when={
                                    props.enableSorting !== false &&
                                    header.column.getIsSorted() === "desc"
                                  }
                                >
                                  <ChevronDown size={16} />
                                </Show>
                              </button>
                              <Show
                                when={
                                  props.enableColumnFilters !== false &&
                                  header.column.getCanFilter()
                                }
                              >
                                <Filter column={header.column} data={props.data} />
                              </Show>
                            </div>
                          }
                        >
                          {null}
                        </Show>
                      </th>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </thead>

          <tbody
            ref={parentRef}
            style={{
              display: "block",
              height: props.height || "400px",
              overflow: "auto",
              position: "relative",
            }}
            class={styles.body()}
          >
            <For each={rowVirtualizer().getVirtualItems()}>
              {(virtualItem) => {
                const row = filteredRows()[virtualItem.index];
                if (!row) {
                  return null;
                }

                return (
                  <tr
                    class={styles.row()}
                    style={{
                      display: "flex",
                      height: `${virtualItem.size}px`,
                      left: "0",
                      position: "absolute",
                      top: "0",
                      transform: `translateY(${virtualItem.start}px)`,
                      width: "100%",
                    }}
                  >
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <td
                          class={styles.cell()}
                          style={{
                            flex: cell.column.columnDef.size > 0 ? "none" : "1",
                            width:
                              cell.column.columnDef.size > 0
                                ? `${cell.column.columnDef.size}px`
                                : "auto",
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )}
                    </For>
                  </tr>
                );
              }}
            </For>

            {/* Spacer for total height */}
            <tr
              style={{
                height: `${rowVirtualizer().getTotalSize()}px`,
                visibility: "hidden",
              }}
            >
              <td
                style={{
                  display: "block",
                }}
              />
            </tr>
          </tbody>
        </table>
      </div>

      <div class={styles.outerFooter()}>
        <div class="flex items-center justify-between">
          <span>
            Showing {filteredRows().length} of {props.data.length} rows
          </span>
          <Show
            when={props.enableDownload !== false && filteredRows().length !== props.data.length}
          >
            <span class="text-sm text-base-content/60">
              Download includes {filteredRows().length} filtered rows
            </span>
          </Show>
        </div>
      </div>
    </div>
  );
}

export default VirtualizedDataTable;
