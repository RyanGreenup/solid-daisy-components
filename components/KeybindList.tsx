import { For, createSignal, splitProps, Show } from "solid-js";
import { tv } from "tailwind-variants";

import { useKeybinding } from "../utilities/useKeybinding";

import type { JSX } from "solid-js";

export const keybindListVariants = tv({
  base: "menu bg-base-100 rounded-box border border-base-300 focus:outline-2 focus:outline-primary flex-nowrap",
  defaultVariants: {
    maxHeight: "md",
    size: "md",
  },
  variants: {
    maxHeight: {
      lg: "max-h-96",
      md: "max-h-72",
      sm: "max-h-48",
      xl: "max-h-[32rem]",
    },
    size: {
      lg: "w-64",
      md: "w-56",
      sm: "w-48",
      xl: "w-80",
    },
  },
});

export const keybindListItemVariants = tv({
  base: "cursor-pointer transition-colors duration-150 rounded transition-all duration-100 ease-in-out",
  defaultVariants: {
    focused: false,
    selected: false,
  },
  variants: {
    focused: {
      false: "",
      true: "ring-2 ring-primary ring-inset",
    },
    selected: {
      false: "hover:bg-base-200",
      true: "active bg-primary text-primary-content",
    },
  },
});

type KeybindListVariants = Parameters<typeof keybindListVariants>[0];

export type KeybindListProps<T = string> = Omit<
  JSX.HTMLAttributes<HTMLUListElement>,
  "onSelect" | "onFocused" | "children"
> &
  KeybindListVariants & {
    items: T[];
    onSelect?: (item: T, index: number) => void;
    onFocused?: (item: T, index: number) => void;
    selectedIndex?: number;
    children?: (
      item: T,
      index: () => number,
      state: { focused: boolean; selected: boolean },
    ) => JSX.Element;
  };

/**
 * A keyboard-navigable menu list that supports arrow-key / `j`/`k` focus movement
 * and `Enter` to select. Renders a `<ul>` with DaisyUI `menu` classes; accepts a
 * custom `children` render-prop for each item, with `focused` and `selected` state.
 * Use `size` and `maxHeight` to control width and scroll area.
 */
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
        const newIndex = (focusedIndex() - 1 + local.items.length) % local.items.length;
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
        class: local.class,
        maxHeight: local.maxHeight,
        size: local.size,
      })}
      style={{ "overflow-y": "auto" }}
    >
      <For each={local.items}>
        {(item, index) => {
          const isFocused = () => focusedIndex() === index();
          const isSelected = () => local.selectedIndex === index();

          return (
            <li
              class={
                local.children
                  ? ""
                  : keybindListItemVariants({
                      focused: isFocused(),
                      selected: isSelected(),
                    })
              }
            >
              <Show
                when={local.children}
                fallback={
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
                }
              >
                <div
                  class="w-full"
                  onClick={() => {
                    setFocusedIndex(index());
                    local.onFocused?.(item, index());
                    local.onSelect?.(item, index());
                  }}
                >
                  {local.children(item, index, {
                    focused: isFocused(),
                    selected: isSelected(),
                  })}
                </div>
              </Show>
            </li>
          );
        }}
      </For>
    </ul>
  );
}
