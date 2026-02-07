import { Combobox, ComboboxTriggerMode } from "@kobalte/core/combobox";

// @ts-ignore
import Check from "lucide-solid/icons/check";
import { createSignal, For, createEffect, JSX, Show } from "solid-js";

// @ts-ignore
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { comboboxStyles } from "./style";
import "./comboboxStyle.module.css";

const styles = comboboxStyles();

interface SingleComboboxProps<T = string> {
  options: T[];
  placeholder?: string;
  value?: T extends string ? string : any;
  onChange?: (value: T extends string ? string : any) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
  // Optional props for object-based options (property keys, not functions)
  optionValue?: keyof T;
  optionLabel?: keyof T;
  optionTextValue?: keyof T;
  optionDisabled?: keyof T;
  itemComponent?: (props: { item: any }) => JSX.Element;
}

export function SingleCombobox<T = string>(props: SingleComboboxProps<T>): JSX.Element {
  const [value, setValue] = createSignal(props.value || "");

  // Sync internal state with prop changes
  createEffect(() => {
    setValue(props.value || "");
  });

  const handleChange = (newValue: any) => {
    const val = newValue || "";
    setValue(val);
    props.onChange?.(val);
  };

  // Default item component for backward compatibility
  const defaultItemComponent = (itemProps: { item: any }) => (
    <Combobox.Item item={itemProps.item} class={styles.item}>
      <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
      <Combobox.ItemIndicator class={styles.itemIndicator}>
        <Check />
      </Combobox.ItemIndicator>
    </Combobox.Item>
  );

  return (
    <div style={{ width: "100%", "max-width": "20rem" }}>
      <Combobox<T>
        multiple={false}
        options={props.options}
        value={value()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "input"}
        optionValue={props.optionValue as any}
        optionLabel={props.optionLabel as any}
        optionTextValue={props.optionTextValue as any}
        optionDisabled={props.optionDisabled as any}
        itemComponent={props.itemComponent || defaultItemComponent}
      >
        <Show when={props.label}>
          <Combobox.Label>{props.label}</Combobox.Label>
        </Show>
        <Combobox.Control class={styles.control} aria-label="Fruit">
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
