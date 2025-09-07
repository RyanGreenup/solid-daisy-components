import { createSignal, For, JSX, splitProps } from "solid-js";
import { tv } from "tailwind-variants";
import { useKeybinding } from "../utilities/useKeybinding";

export const keybindListVariants = tv({
  base: "menu bg-base-100 rounded-box border border-base-300 focus:outline-2 focus:outline-primary flex-nowrap",
  variants: {
    size: {
      sm: "w-48",
      md: "w-56",
      lg: "w-64",
      xl: "w-80",
    },
    maxHeight: {
      sm: "max-h-48",
      md: "max-h-72",
      lg: "max-h-96",
      xl: "max-h-[32rem]",
    },
  },
  defaultVariants: {
    size: "md",
    maxHeight: "md",
  },
});

export const keybindListItemVariants = tv({
  base: "cursor-pointer transition-colors duration-150 rounded transition-all duration-100 ease-in-out",
  variants: {
    selected: {
      true: "active bg-primary text-primary-content",
      false: "hover:bg-base-200",
    },
    focused: {
      true: "ring-2 ring-primary ring-inset",
      false: "",
    },
  },
  defaultVariants: {
    selected: false,
    focused: false,
  },
});

type KeybindListVariants = Parameters<typeof keybindListVariants>[0];

export type KeybindListProps<T = string> = JSX.HTMLAttributes<HTMLUListElement> &
  KeybindListVariants & {
    items: T[];
    onSelect?: (item: T, index: number) => void;
    onFocused?: (item: T, index: number) => void;
    selectedIndex?: number;
    children?: (item: T, index: () => number, state: { focused: boolean; selected: boolean }) => JSX.Element;
  };

export function KeybindList<T = string>(props: KeybindListProps<T>) {
  const [local, others] = splitProps(props, [
    "items",
    "onSelect",
    "onFocused",
    "selectedIndex",
    "size",
    "maxHeight",
    "class",
    "children",
  ]);

  const [focusedIndex, setFocusedIndex] = createSignal(0);
  let listRef: HTMLUListElement | undefined;

  // Arrow Down and j key keybindings - move focus down
  for (const key of ["ArrowDown", "j"]) {
    useKeybinding(
      { key },
      () => {
        const newIndex = (focusedIndex() + 1) % local.items.length;
        setFocusedIndex(newIndex);
        local.onFocused?.(local.items[newIndex], newIndex);
      },
      { ref: () => listRef },
    );
  }

  // Arrow Up keybinding - moves focus
  // Arrow Up and k key keybindings - move focus up
  for (const key of ["ArrowUp", "k"]) {
    useKeybinding(
      { key },
      () => {
        const newIndex =
          (focusedIndex() - 1 + local.items.length) % local.items.length;
        setFocusedIndex(newIndex);
        local.onFocused?.(local.items[newIndex], newIndex);
      },
      { ref: () => listRef },
    );
  }

  // Enter keybinding - selects focused item
  useKeybinding(
    { key: "Enter" },
    () => {
      const currentItem = local.items[focusedIndex()];
      local.onSelect?.(currentItem, focusedIndex());
    },
    { ref: () => listRef },
  );

  return (
    <ul
      ref={listRef}
      tabindex="0"
      {...others}
      class={keybindListVariants({
        size: local.size,
        maxHeight: local.maxHeight,
        class: local.class,
      })}
      style={{ "overflow-y": "auto" }}
    >
      <For each={local.items}>
        {(item, index) => {
          const isFocused = () => focusedIndex() === index();
          const isSelected = () => local.selectedIndex === index();
          
          return (
            <li
              class={local.children ? "" : keybindListItemVariants({
                selected: isSelected(),
                focused: isFocused(),
              })}
            >
              {local.children ? (
                <div
                  class="w-full"
                  onClick={() => {
                    setFocusedIndex(index());
                    local.onFocused?.(item, index());
                    local.onSelect?.(item, index());
                  }}
                >
                  {local.children(item, index, { focused: isFocused(), selected: isSelected() })}
                </div>
              ) : (
                <a
                  class="w-full"
                  onClick={() => {
                    setFocusedIndex(index());
                    local.onFocused?.(item, index());
                    local.onSelect?.(item, index());
                  }}
                >
                  {String(item)}
                </a>
              )}
            </li>
          );
        }}
      </For>
    </ul>
  );
}
