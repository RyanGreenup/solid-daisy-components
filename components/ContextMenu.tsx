import { For, Show, createEffect, createMemo, createSignal, onCleanup, splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import { tv } from "tailwind-variants";

import { useKeybinding } from "../utilities/useKeybinding";

import type { JSX } from "solid-js";

// Context menu item types
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  keybind?: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

// Context menu variants
export const contextMenuVariants = tv({
  base: [
    "fixed z-50 bg-base-100 border border-base-300 rounded-lg shadow-lg",
    "min-w-48 max-w-64 py-2",
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  ],
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "min-w-56 text-lg",
      md: "min-w-48",
      sm: "min-w-40 text-sm",
    },
  },
});

export const contextMenuItemVariants = tv({
  base: [
    "flex items-center gap-3 px-3 py-2 text-sm cursor-pointer",
    "hover:bg-base-200 focus:bg-base-200 focus:outline-none",
    "transition-colors duration-150",
  ],
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent",
    },
    focused: {
      true: "bg-base-200",
    },
  },
});

export const contextMenuSeparatorVariants = tv({
  base: "h-px bg-base-300 mx-2 my-1",
});

// Component props types
type ContextMenuVariants = Parameters<typeof contextMenuVariants>[0];
export type ContextMenuProps = {
  items: ContextMenuItem[];
  open: boolean;
  x: number;
  y: number;
  onOpenChange: (open: boolean) => void;
  class?: string;
} & ContextMenuVariants;

// Context menu component
/**
 * Positioned context-menu overlay rendered via a `Portal`. Accepts an `items` array
 * (supporting icons, keybind labels, disabled state, and separators) and controlled
 * `open`/`x`/`y`/`onOpenChange` props. Supports keyboard navigation (ArrowUp/Down,
 * Enter, Escape) and auto-adjusts position to stay within the viewport.
 */
export const ContextMenu = (props: ContextMenuProps) => {
  const [local, others] = splitProps(props, [
    "items",
    "open",
    "x",
    "y",
    "onOpenChange",
    "size",
    "class",
  ]);

  const [focusedIndex, setFocusedIndex] = createSignal(-1);
  const [menuRendered, setMenuRendered] = createSignal(false);
  let menuRef: HTMLDivElement | undefined;

  // Filter out separator-only items for navigation
  const navigableItems = createMemo(() => local.items.filter((item) => !item.separator));

  // Close menu on escape key (scoped to menu element)
  useKeybinding(
    { key: "Escape" },
    () => {
      if (local.open) {
        local.onOpenChange(false);
      }
    },
    { ref: () => menuRef },
  );

  // Navigate with arrow keys (scoped to menu element)
  useKeybinding(
    { key: "ArrowDown" },
    () => {
      if (local.open) {
        const items = navigableItems();
        setFocusedIndex((prev) => {
          const next = (prev + 1) % items.length;
          return next;
        });
      }
    },
    { ref: () => menuRef },
  );

  useKeybinding(
    { key: "ArrowUp" },
    () => {
      if (local.open) {
        const items = navigableItems();
        setFocusedIndex((prev) => {
          const next = prev <= 0 ? items.length - 1 : prev - 1;
          return next;
        });
      }
    },
    { ref: () => menuRef },
  );

  // Execute focused item on Enter (scoped to menu element)
  useKeybinding(
    { key: "Enter" },
    () => {
      if (local.open) {
        const items = navigableItems();
        const focusedItem = items[focusedIndex()];
        if (focusedItem && !focusedItem.disabled && focusedItem.onClick) {
          focusedItem.onClick();
          local.onOpenChange(false);
        }
      }
    },
    { ref: () => menuRef },
  );

  // Close on click outside
  createEffect(() => {
    if (!local.open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef && !menuRef.contains(event.target as Node)) {
        local.onOpenChange(false);
      }
    };

    // Small delay to prevent immediate closing when opening
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);

    onCleanup(() => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    });
  });

  // Focus the menu when it opens
  createEffect(() => {
    if (local.open && menuRef) {
      menuRef.focus();
      setFocusedIndex(0); // Focus first item
    }
  });

  // Track when menu is rendered to trigger position calculation
  createEffect(() => {
    if (local.open && menuRef) {
      // Trigger re-calculation when menu becomes available
      setMenuRendered(true);
    } else {
      setMenuRendered(false);
    }
  });

  // Reactive position calculation that updates when menu dimensions change
  const position = createMemo(() => {
    // Access the signal to make this reactive to menu rendering
    menuRendered();

    if (!local.open || !menuRef) {
      return { x: local.x, y: local.y };
    }

    const rect = menuRef.getBoundingClientRect();

    // If rect has no dimensions, the menu hasn't rendered yet - return initial position
    if (rect.width === 0 || rect.height === 0) {
      return { x: local.x, y: local.y };
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let { x } = local;
    let { y } = local;

    // Adjust horizontal position
    if (x + rect.width > viewportWidth) {
      x = viewportWidth - rect.width - 8;
    }

    // Smart vertical positioning - always keep menu fully visible
    if (local.y + rect.height > viewportHeight - 8) {
      // Not enough space below, position above the cursor
      y = local.y - rect.height;
    } else {
      // Enough space below, position below the cursor
      ({ y } = local);
    }

    // Final bounds check
    y = Math.max(8, Math.min(y, viewportHeight - rect.height - 8));

    return { x: Math.max(8, x), y: Math.max(8, y) };
  });

  return (
    <Show when={local.open}>
      <Portal>
        <div
          ref={menuRef}
          tabindex="-1"
          class={contextMenuVariants({
            class: local.class,
            size: local.size,
          })}
          style={{
            left: `${position().x}px`,
            top: `${position().y}px`,
            "z-index": "9999",
          }}
          {...others}
        >
          <For each={local.items}>
            {(item, index) => {
              if (item.separator) {
                return <div class={contextMenuSeparatorVariants()} />;
              }

              const navigableIndex = createMemo(() =>
                navigableItems().findIndex((navItem) => navItem.id === item.id),
              );
              const isFocused = () => focusedIndex() === navigableIndex();

              return (
                <div
                  class={contextMenuItemVariants({
                    disabled: item.disabled,
                    focused: isFocused(),
                  })}
                  onClick={() => {
                    if (!item.disabled && item.onClick) {
                      item.onClick();
                      local.onOpenChange(false);
                    }
                  }}
                  onMouseEnter={() => setFocusedIndex(navigableIndex())}
                >
                  <Show when={item.icon}>
                    <span class="flex-shrink-0 w-4 h-4">{item.icon}</span>
                  </Show>
                  <span class="flex-1 truncate">{item.label}</span>
                  <Show when={item.keybind}>
                    <span class="flex-shrink-0 text-xs opacity-60">{item.keybind}</span>
                  </Show>
                </div>
              );
            }}
          </For>
        </div>
      </Portal>
    </Show>
  );
};

// Hook for easy context menu usage
export interface UseContextMenuOptions {
  items: ContextMenuItem[];
  onOpenChange?: (open: boolean) => void;
}

/**
 * Convenience hook that manages open state and cursor position for a `ContextMenu`.
 * Returns `open` (to call on `onContextMenu`), `close`, `isOpen`, and `contextMenuProps`
 * (spread directly onto `<ContextMenu>`).
 */
export const useContextMenu = (options: UseContextMenuOptions) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [position, setPosition] = createSignal({ x: 0, y: 0 });

  const open = (event: MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
    options.onOpenChange?.(true);
  };

  const close = () => {
    setIsOpen(false);
    options.onOpenChange?.(false);
  };

  const contextMenuProps = () => ({
    items: options.items,
    onOpenChange: (open: boolean) => {
      setIsOpen(open);
      options.onOpenChange?.(open);
    },
    open: isOpen(),
    x: position().x,
    y: position().y,
  });

  return {
    close,
    contextMenuProps,
    isOpen,
    open,
  };
};
