import { Combobox } from "@kobalte/core/combobox";
// @ts-expect-error
import Check from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
// @ts-expect-error
import X from "lucide-solid/icons/x";
import { For, Show, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

import { comboboxStyles } from "./style";

import type { ComboboxTriggerMode } from "@kobalte/core/combobox";
import type { JSX, JSXElement } from "solid-js";
import "./comboboxStyle.module.css";

const styles = comboboxStyles();

interface MultiComboboxProps {
  options: string[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
}

/**
 * A multi-select combobox backed by Kobalte's Combobox primitive.
 * Selected values are displayed as removable tag chips inside the input control.
 * Accepts a plain string `options` array; calls `onChange` with the full array of selected strings.
 */
export function MultiCombobox(props: MultiComboboxProps): JSX.Element {
  const [value, setValue] = createSignal(props.value || []);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div style={{ "max-width": "20rem", width: "100%" }}>
      <Combobox<string>
        multiple={true}
        options={props.options}
        value={value()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "input"}
        itemComponent={(itemProps) => (
          <Combobox.Item item={itemProps.item} class={styles.item}>
            <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class={styles.itemIndicator}>
              <Check class={styles.icon} />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        )}
      >
        <Combobox.Control<string>
          class={`${styles.control} ${styles.controlMulti}`}
          aria-label={props.label || "Selection"}
        >
          {(state) => (
            <>
              <div class={`${styles.inputContainer} px-1 py-2`}>
                <For each={state.selectedOptions()}>
                  {(option) => (
                    <div onPointerDown={(e) => e.stopPropagation()} class={styles.tag}>
                      {option}
                      <button
                        class={styles.tagButton}
                        onClick={() => state.remove(option)}
                        type="button"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </For>
                <Combobox.Input ref={props.ref} class={styles.input} />
              </div>
              <TransitionAnim>
                <Show when={state.selectedOptions().length > 0}>
                  <button
                    class={`${styles.clearButton} transition-all duration-200 ease-out`}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={state.clear}
                    type="button"
                  >
                    <X class={styles.icon} />
                  </button>
                </Show>
              </TransitionAnim>
              <Combobox.Trigger class={styles.trigger}>
                <Combobox.Icon>
                  <ChevronsUpDown class={styles.icon} />
                </Combobox.Icon>
              </Combobox.Trigger>
            </>
          )}
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles.content}>
            <Combobox.Listbox class={styles.listbox} />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>

      <p class={styles.description}>Selected: {value().join(", ") || "None"}</p>
    </div>
  );
}

const TransitionAnim = (props: { children: JSXElement }) => (
  <Transition
    enterActiveClass="transition-all duration-200 ease-out"
    enterClass="opacity-0 scale-75 -translate-x-2"
    enterToClass="opacity-100 scale-100 translate-x-0"
    exitActiveClass="transition-all duration-150 ease-out"
    exitClass="opacity-100 scale-100 translate-x-0"
    exitToClass="opacity-0 scale-75 -translate-x-2"
  >
    {props.children}
  </Transition>
);
