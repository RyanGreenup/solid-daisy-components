import { tv } from "tailwind-variants";

import styles from "./comboboxStyle.module.css";

export const comboboxVariants = tv({
  defaultVariants: {
    highlightSelected: false,
  },
  slots: {
    clearButton:
      "flex items-center justify-center w-6 h-6 bg-transparent border-none rounded-md cursor-pointer flex-shrink-0 transition-all duration-150 hover:bg-base-200",
    content: `bg-base-100 rounded-lg border border-base-300 shadow-lg transform-gpu origin-[var(--kb-combobox-content-transform-origin)] z-[var(--z-dropdown,30)] ${styles.content}`,
    control:
      "inline-flex justify-between w-full outline-none bg-base-100 border border-base-300 rounded-lg text-base-content transition-all duration-200 focus-within:border-primary focus-within:shadow-sm focus-within:shadow-primary/20",
    controlMulti: "flex-wrap",
    description: "text-sm text-base-content/70 mt-2",
    errorMessage: "text-sm text-error mt-2 hidden data-[invalid]:block",
    icon: "h-5 w-5 flex-shrink-0",
    input: [
      "appearance-none inline-flex outline-none min-w-0 min-h-8 pl-4 text-base bg-transparent rounded-l-lg placeholder:text-base-content/50",
      // Must have width full to fill parent seamlessly
      "w-full",
    ],
    inputContainer: "flex flex-wrap items-center gap-1 flex-1 px-1 py-2",
    item: "text-base-content rounded-lg flex items-center justify-between h-8 px-2 relative select-none outline-none transition-all duration-150 hover:bg-base-200 data-[highlighted]:bg-primary data-[highlighted]:text-primary-content data-[highlighted]:outline-none  data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:text-base-content/40",
    itemIndicator:
      "h-5 w-5 inline-flex items-center justify-center transition-opacity duration-200",
    listbox: "overflow-y-auto max-h-80 p-4 focus:outline-none",
    tag: "inline-flex items-center gap-1 px-2 py-0.5 bg-secondary text-secondary-content text-xs font-medium rounded-md flex-shrink-0",
    tagButton:
      "flex items-center justify-center w-4 h-4 bg-transparent border-none rounded-full cursor-pointer transition-all duration-150 hover:bg-base-content/20",
    trigger:
      "appearance-none inline-flex justify-center items-center w-auto outline-none rounded-r-lg px-2 bg-base-300 leading-none border-l border-base-300 text-base-content transition-colors duration-150 hover:bg-base-200",
  },
  variants: {
    highlightSelected: {
      true: {
        item: ["data-[selected]:font-semibold data-[selected]:bg-primary/10"],
      },
    },
  },
});

// For now, export a compatibility function that returns the slots as strings
/**
 * Returns a flat object of resolved Tailwind class strings for every combobox slot
 * (control, input, trigger, item, tag, etc.) by invoking `comboboxVariants` with default variants.
 * Use this instead of calling `comboboxVariants()` directly when you only need plain class strings.
 */
export const comboboxStyles = () => {
  const slots = comboboxVariants();
  return {
    clearButton: slots.clearButton(),
    content: slots.content(),
    control: slots.control(),
    controlMulti: slots.controlMulti(),
    description: slots.description(),
    errorMessage: slots.errorMessage(),
    icon: slots.icon(),
    input: slots.input(),
    inputContainer: slots.inputContainer(),
    item: slots.item(),
    itemIndicator: slots.itemIndicator(),
    listbox: slots.listbox(),
    tag: slots.tag(),
    tagButton: slots.tagButton(),
    trigger: slots.trigger(),
  };
};
