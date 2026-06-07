import { Combobox } from "@kobalte/core/combobox";
import Check from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { Show, createEffect, createSignal } from "solid-js";

import { comboboxStyles } from "./style";

import type { ComboboxTriggerMode } from "@kobalte/core/combobox";
import type { JSX } from "solid-js";
import "./comboboxStyle.module.css";

const styles = comboboxStyles();

interface SingleComboboxProps<T = string> {
  /** Option list: a `string[]` in plain mode, or an object array `T[]` when using the `option*` keys. */
  options: T[];
  placeholder?: string;
  /** Controlled selected value — the extracted string value, not the object. */
  value?: string;
  /** Called with the extracted string value of the newly selected option. */
  onChange?: (value: string) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
  /** Key to extract the stored string value from object options. */
  optionValue?: keyof T;
  /** Key to extract the display label from object options. */
  optionLabel?: keyof T;
  /** Key to extract searchable text from object options (defaults to `optionLabel`). */
  optionTextValue?: keyof T;
  /** Key that marks an option disabled. */
  optionDisabled?: keyof T;
  /** Custom renderer for one option; falls back to a label + check-mark item. */
  itemComponent?: (props: { item: { rawValue: T } }) => JSX.Element;
  class?: string;
}

/**
 * A single-select combobox backed by Kobalte's Combobox primitive.
 * Supports plain string arrays and object arrays (via `optionValue`/`optionLabel`/
 * `optionTextValue`/`optionDisabled`). Internally stores the extracted string value,
 * syncs with the `value` prop, and calls `onChange` with that string. Pass
 * `itemComponent` to override how each option renders.
 */
export function SingleCombobox<T = string>(props: SingleComboboxProps<T>): JSX.Element {
  const [value, setValue] = createSignal(props.value || "");

  // Sync internal state with prop changes
  createEffect(() => {
    setValue(props.value || "");
  });

  // Object-option helpers: convert between the stored string value and the full option object.
  const extractValue = (opt: T): string =>
    props.optionValue ? String(opt[props.optionValue]) : String(opt);

  const extractLabel = (opt: T): string =>
    props.optionLabel ? String(opt[props.optionLabel]) : String(opt);

  const findOption = (val: string): T | string | null =>
    props.optionValue
      ? (props.options.find((opt) => String(opt[props.optionValue!]) === val) ?? null)
      : val;

  // Kobalte expects the full object in object mode, the string in plain mode.
  const kobalteValue = () => findOption(value());

  const handleChange = (newValue: T | string | null) => {
    const val = newValue ? extractValue(newValue as T) : "";
    setValue(val);
    props.onChange?.(val);
  };

  const defaultItemComponent = (itemProps: { item: { rawValue: T } }) => (
    <Combobox.Item item={itemProps.item as never} class={styles.item}>
      <Combobox.ItemLabel>{extractLabel(itemProps.item.rawValue)}</Combobox.ItemLabel>
      <Combobox.ItemIndicator class={styles.itemIndicator}>
        <Check />
      </Combobox.ItemIndicator>
    </Combobox.Item>
  );

  return (
    <div class={props.class ?? "w-full max-w-xs"}>
      <Combobox
        multiple={false}
        options={props.options}
        value={kobalteValue() as never}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "input"}
        {...(props.optionValue
          ? {
              optionValue: props.optionValue,
              optionLabel: props.optionLabel,
              optionTextValue: props.optionTextValue ?? props.optionLabel,
              optionDisabled: props.optionDisabled,
            }
          : {})}
        itemComponent={props.itemComponent ?? defaultItemComponent}
      >
        <Show when={props.label}>
          <Combobox.Label>{props.label}</Combobox.Label>
        </Show>
        <Combobox.Control class={styles.control} aria-label={props.label || "Select"}>
          <Combobox.Input class={styles.input} ref={props.ref} />
          <Combobox.Trigger class={styles.trigger}>
            <Combobox.Icon class={styles.icon}>
              <ChevronsUpDown />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles.content}>
            <Combobox.Arrow />
            <Combobox.Listbox class={styles.listbox} />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>
  );
}
