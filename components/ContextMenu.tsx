import { tv } from "tailwind-variants";
import { 
  splitProps, 
  children, 
  JSX, 
  createSignal, 
  createEffect, 
  onCleanup,
  Show,
  For 
} from "solid-js";
import { Portal } from "solid-js/web";
import { useKeybinding } from "../utilities/useKeybinding";

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
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
  ],
  variants: {
    size: {
      sm: "min-w-40 text-sm",
      md: "min-w-48",
      lg: "min-w-56 text-lg"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const contextMenuItemVariants = tv({
  base: [
    "flex items-center gap-3 px-3 py-2 text-sm cursor-pointer",
    "hover:bg-base-200 focus:bg-base-200 focus:outline-none",
    "transition-colors duration-150"
  ],
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent"
    },
    focused: {
      true: "bg-base-200"
    }
  }
});

export const contextMenuSeparatorVariants = tv({
  base: "h-px bg-base-300 mx-2 my-1"
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
export const ContextMenu = (props: ContextMenuProps) => {
  const [local, others] = splitProps(props, [
    "items", 
    "open", 
    "x", 
    "y", 
    "onOpenChange", 
    "size", 
    "class"
  ]);
  
  const [focusedIndex, setFocusedIndex] = createSignal(-1);
  let menuRef: HTMLDivElement | undefined;

  // Filter out separator-only items for navigation
  const navigableItems = () => local.items.filter(item => !item.separator);

  // Close menu on escape key (scoped to menu element)
  useKeybinding(
    { key: "Escape" },
    () => {
      if (local.open) {
        local.onOpenChange(false);
      }
    },
    { ref: () => menuRef }
  );

  // Navigate with arrow keys (scoped to menu element)
  useKeybinding(
    { key: "ArrowDown" },
    () => {
      if (local.open) {
        const items = navigableItems();
        setFocusedIndex(prev => {
          const next = (prev + 1) % items.length;
          return next;
        });
      }
    },
    { ref: () => menuRef }
  );

  useKeybinding(
    { key: "ArrowUp" },
    () => {
      if (local.open) {
        const items = navigableItems();
        setFocusedIndex(prev => {
          const next = prev <= 0 ? items.length - 1 : prev - 1;
          return next;
        });
      }
    },
    { ref: () => menuRef }
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
    { ref: () => menuRef }
  );

  // Close on click outside
  createEffect(() => {
    if (!local.open) return;

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

  // Adjust position to stay within viewport
  const getAdjustedPosition = () => {
    if (!menuRef) return { x: local.x, y: local.y };

    const rect = menuRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = local.x;
    let y = local.y;

    // Adjust horizontal position
    if (x + rect.width > viewportWidth) {
      x = viewportWidth - rect.width - 8;
    }

    // Adjust vertical position
    if (y + rect.height > viewportHeight) {
      y = viewportHeight - rect.height - 8;
    }

    return { x: Math.max(8, x), y: Math.max(8, y) };
  };

  return (
    <Show when={local.open}>
      <Portal>
        <div
          ref={menuRef}
          tabindex="-1"
          class={contextMenuVariants({
            size: local.size,
            class: local.class
          })}
          style={{
            left: `${getAdjustedPosition().x}px`,
            top: `${getAdjustedPosition().y}px`
          }}
          {...others}
        >
          <For each={local.items}>
            {(item, index) => {
              if (item.separator) {
                return <div class={contextMenuSeparatorVariants()} />;
              }

              const navigableIndex = navigableItems().findIndex(navItem => navItem.id === item.id);
              const isFocused = () => focusedIndex() === navigableIndex;

              return (
                <div
                  class={contextMenuItemVariants({
                    disabled: item.disabled,
                    focused: isFocused()
                  })}
                  onClick={() => {
                    if (!item.disabled && item.onClick) {
                      item.onClick();
                      local.onOpenChange(false);
                    }
                  }}
                  onMouseEnter={() => setFocusedIndex(navigableIndex)}
                >
                  <Show when={item.icon}>
                    <span class="flex-shrink-0 w-4 h-4">
                      {item.icon}
                    </span>
                  </Show>
                  <span class="flex-1 truncate">{item.label}</span>
                  <Show when={item.keybind}>
                    <span class="flex-shrink-0 text-xs opacity-60">
                      {item.keybind}
                    </span>
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
    open: isOpen(),
    x: position().x,
    y: position().y,
    onOpenChange: (open: boolean) => {
      setIsOpen(open);
      options.onOpenChange?.(open);
    }
  });

  return {
    isOpen,
    open,
    close,
    contextMenuProps
  };
};