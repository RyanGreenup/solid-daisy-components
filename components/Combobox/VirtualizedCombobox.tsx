import { Combobox, type ComboboxTriggerMode } from "@kobalte/core/combobox";
import { createVirtualizer } from "@tanstack/solid-virtual";
import Fuse from "fuse.js";
import Check from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { type Accessor, For, Show, createEffect, createMemo, createSignal } from "solid-js";

import "./comboboxStyle.module.css";
import { comboboxStyles } from "./style";

const styles = comboboxStyles();

interface VirtualizedSingleComboboxProps {
  options: any[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  class?: string;
  doubleClickToOpen?: boolean;
  triggerMode?: ComboboxTriggerMode;
  /** Key to extract the value from object options */
  optionValue?: string;
  /** Key to extract the display label from object options */
  optionLabel?: string;
  /** Key to extract searchable text from object options (defaults to optionLabel) */
  optionTextValue?: string;
}

/**
 * A virtualized single-select combobox for large option lists, backed by Kobalte's virtualized Combobox and TanStack Virtual.
 * Uses Fuse.js for client-side fuzzy filtering and renders only visible rows via `@tanstack/solid-virtual`.
 * Supports plain string arrays or object arrays via `optionValue`/`optionLabel`/`optionTextValue`.
 * Set `doubleClickToOpen` to open the dropdown on double-click of the input.
 */
export function VirtualizedSingleCombobox(props: VirtualizedSingleComboboxProps) {
  const [value, setValue] = createSignal(props.value || "");
  const [inputValue, setInputValue] = createSignal("");
  const [open, setOpen] = createSignal(false);

  createEffect(() => {
    setValue(props.value || "");
  });

  // Object option helpers
  const extractValue = (opt: any): string =>
    props.optionValue ? opt[props.optionValue] : String(opt);

  const extractLabel = (opt: any): string =>
    props.optionLabel ? opt[props.optionLabel] : String(opt);

  const findOption = (val: string) =>
    props.optionValue
      ? (props.options.find((opt) => opt[props.optionValue!] === val) ?? null)
      : val;

  // Fuse.js for fuzzy search
  const fuse = createMemo(() => {
    const keys = props.optionLabel ? [props.optionLabel] : [];
    return new Fuse(props.options, {
      threshold: 0.4,
      ...(keys.length > 0 ? { keys } : {}),
    });
  });

  const filteredOptions = createMemo(() => {
    const input = inputValue();
    if (!input) {
      return props.options;
    }
    return fuse()
      .search(input)
      .map((r) => r.item);
  });

  const handleChange = (newValue: any | null) => {
    const val = newValue ? extractValue(newValue) : "";
    setValue(val);
    props.onChange?.(val);
  };

  // Kobalte expects the full object in object mode, string in string mode
  const kobalteValue = () => findOption(value());

  return (
    <div class={props.class || "w-full max-w-xs"}>
      <Combobox
        multiple={false}
        virtualized
        options={filteredOptions()}
        value={kobalteValue()}
        onChange={handleChange}
        onInputChange={setInputValue}
        defaultFilter={() => true}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "manual"}
        open={open()}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) {
            setInputValue("");
          }
        }}
        {...(props.optionValue
          ? {
              optionLabel: props.optionLabel,
              optionTextValue: props.optionTextValue ?? props.optionLabel,
              optionValue: props.optionValue,
            }
          : {})}
      >
        <Show when={props.label}>
          <Combobox.Label>{props.label}</Combobox.Label>
        </Show>
        <Combobox.Control class={styles.control} aria-label={props.label || "Selection"}>
          <Combobox.Input
            class={styles.input}
            onDblClick={props.doubleClickToOpen !== false ? () => setOpen(true) : undefined}
          />
          <Combobox.Trigger class={styles.trigger}>
            <Combobox.Icon>
              <ChevronsUpDown class={styles.icon} />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles.content}>
            <VirtualizedListbox
              options={filteredOptions}
              extractValue={extractValue}
              extractLabel={extractLabel}
            />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>
  );
}

function VirtualizedListbox(props: {
  options: Accessor<any[]>;
  extractValue: (opt: any) => string;
  extractLabel: (opt: any) => string;
}) {
  let listboxRef: HTMLUListElement | undefined;

  const virtualizer = createVirtualizer({
    get count() {
      return props.options().length;
    },
    estimateSize: () => 36,
    getItemKey: (index: number) => props.extractValue(props.options()[index]),
    getScrollElement: () => listboxRef ?? null,
    overscan: 5,
  });

  return (
    <Combobox.Listbox
      ref={listboxRef}
      scrollToItem={(key: string) => {
        const idx = props.options().findIndex((o) => props.extractValue(o) === key);
        if (idx !== -1) {
          virtualizer.scrollToIndex(idx);
        }
      }}
      style={{ height: "200px", overflow: "auto", width: "100%" }}
    >
      {(items) => (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          <For each={virtualizer.getVirtualItems()}>
            {(virtualRow) => {
              const item = items().getItem(String(virtualRow.key));
              if (!item) {
                return null;
              }
              return (
                <Combobox.Item
                  item={item}
                  class={styles.item}
                  style={{
                    height: `${virtualRow.size}px`,
                    left: 0,
                    position: "absolute",
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%",
                  }}
                >
                  <Combobox.ItemLabel>{props.extractLabel(item.rawValue)}</Combobox.ItemLabel>
                  <Combobox.ItemIndicator class={styles.itemIndicator}>
                    <Check class={styles.icon} />
                  </Combobox.ItemIndicator>
                </Combobox.Item>
              );
            }}
          </For>
        </div>
      )}
    </Combobox.Listbox>
  );
}
