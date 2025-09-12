import { tv } from "tailwind-variants";
import { splitProps, children, JSX, For, Show, createMemo } from "solid-js";
import { Button } from "./Button";

export const paginationVariants = tv({
  base: "join",
  variants: {
    direction: {
      horizontal: "join-horizontal",
      vertical: "join-vertical",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

type PaginationVariants = Parameters<typeof paginationVariants>[0];

export type PaginationProps = JSX.HTMLAttributes<HTMLDivElement> & PaginationVariants & {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
};

export type PaginationButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  page?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const PaginationButton = (props: PaginationButtonProps) => {
  const [local, others] = splitProps(props, [
    "active",
    "page",
    "size",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <Button
      {...others}
      class={`join-item ${local.class || ""}`}
      size={local.size}
      state={local.active ? "active" : "default"}
    >
      {safeChildren()}
    </Button>
  );
};

const PaginationComponent = (props: PaginationProps) => {
  const [local, others] = splitProps(props, [
    "direction",
    "class",
    "children",
    "currentPage",
    "totalPages",
    "onPageChange",
    "showFirstLast",
    "showPrevNext",
    "maxVisiblePages",
    "size",
    "disabled",
  ]);

  const safeChildren = children(() => local.children);
  const currentPage = () => local.currentPage || 1;
  const totalPages = () => local.totalPages || 1;
  const maxVisible = () => local.maxVisiblePages || 5;

  const visiblePages = createMemo(() => {
    const total = totalPages();
    const current = currentPage();
    const max = maxVisible();
    
    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(total, start + max - 1);

    if (end - start + 1 < max) {
      start = Math.max(1, end - max + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  const handlePageClick = (page: number) => {
    if (!local.disabled && local.onPageChange && page !== currentPage()) {
      local.onPageChange(page);
    }
  };

  // If children are provided, render them directly
  if (local.children) {
    return (
      <div
        {...others}
        class={paginationVariants({
          direction: local.direction,
          class: local.class,
        })}
      >
        {safeChildren()}
      </div>
    );
  }

  // Otherwise, render automatic pagination
  return (
    <div
      {...others}
      class={paginationVariants({
        direction: local.direction,
        class: local.class,
      })}
    >
      <Show when={local.showPrevNext}>
        <PaginationButton
          size={local.size}
          disabled={local.disabled || currentPage() === 1}
          onClick={() => handlePageClick(currentPage() - 1)}
        >
          «
        </PaginationButton>
      </Show>

      <Show when={local.showFirstLast && visiblePages()[0] > 1}>
        <PaginationButton
          size={local.size}
          disabled={local.disabled}
          onClick={() => handlePageClick(1)}
        >
          1
        </PaginationButton>
        <Show when={visiblePages()[0] > 2}>
          <PaginationButton size={local.size} disabled>
            ...
          </PaginationButton>
        </Show>
      </Show>

      <For each={visiblePages()}>
        {(page) => (
          <PaginationButton
            size={local.size}
            active={page === currentPage()}
            disabled={local.disabled}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationButton>
        )}
      </For>

      <Show when={local.showFirstLast && visiblePages()[visiblePages().length - 1] < totalPages()}>
        <Show when={visiblePages()[visiblePages().length - 1] < totalPages() - 1}>
          <PaginationButton size={local.size} disabled>
            ...
          </PaginationButton>
        </Show>
        <PaginationButton
          size={local.size}
          disabled={local.disabled}
          onClick={() => handlePageClick(totalPages())}
        >
          {totalPages()}
        </PaginationButton>
      </Show>

      <Show when={local.showPrevNext}>
        <PaginationButton
          size={local.size}
          disabled={local.disabled || currentPage() === totalPages()}
          onClick={() => handlePageClick(currentPage() + 1)}
        >
          »
        </PaginationButton>
      </Show>
    </div>
  );
};

export const Pagination = Object.assign(PaginationComponent, {
  Button: PaginationButton,
});