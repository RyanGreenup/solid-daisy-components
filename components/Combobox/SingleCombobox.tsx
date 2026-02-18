import { Combobox, ComboboxTriggerMode } from "@kobalte/core/combobox";

// @ts-ignore
import Check from "lucide-solid/icons/check";
import { createSignal, createEffect, JSX, Show } from "solid-js";

// @ts-ignore
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { comboboxStyles } from "./style";
import "./comboboxStyle.module.css";

const styles = comboboxStyles();

interface SingleComboboxProps {
  options: any[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
  /** Key to extract the value from object options */
  optionValue?: string;
  /** Key to extract the display label from object options */
  optionLabel?: string;
  /** Key to extract searchable text from object options (defaults to optionLabel) */
  optionTextValue?: string;
  class?: string;
}

export function SingleCombobox(props: SingleComboboxProps): JSX.Element {
  const [value, setValue] = createSignal(props.value || "");

  // Sync internal state with prop changes
  createEffect(() => {
    setValue(props.value || "");
  });

  // Object option helpers
  const extractValue = (opt: any): string =>
    props.optionValue ? opt[props.optionValue] : opt;

  const extractLabel = (opt: any): string =>
    props.optionLabel ? opt[props.optionLabel] : String(opt);

  const findOption = (val: string) =>
    props.optionValue
      ? props.options.find((opt) => opt[props.optionValue!] === val) ?? null
      : val;

  // Kobalte expects the full object in object mode, string in string mode
  const kobalteValue = () => findOption(value());

  const handleChange = (newValue: any | null) => {
    const val = newValue ? extractValue(newValue) : "";
    setValue(val);
    props.onChange?.(val);
  };

  return (
    <div class={props.class ?? "w-full max-w-xs"}>
      <Combobox
        multiple={false}
        options={props.options}
        value={kobalteValue()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "input"}
        {...(props.optionValue
          ? {
              optionValue: props.optionValue,
              optionLabel: props.optionLabel,
              optionTextValue: props.optionTextValue ?? props.optionLabel,
            }
          : {})}
        itemComponent={(itemProps: any) => (
          <Combobox.Item item={itemProps.item} class={styles.item}>
            <Combobox.ItemLabel>
              {extractLabel(itemProps.item.rawValue)}
            </Combobox.ItemLabel>
            <Combobox.ItemIndicator class={styles.itemIndicator}>
              <Check />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        )}
      >
        <Show when={props.label}>
          <Combobox.Label>{props.label}</Combobox.Label>
        </Show>
        <Combobox.Control
          class={styles.control}
          aria-label={props.label || "Select"}
        >
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
