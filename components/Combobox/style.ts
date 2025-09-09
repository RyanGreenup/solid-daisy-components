import { tv } from "tailwind-variants";
import styles from "./comboboxStyle.module.css";


export const comboboxStyles = tv({
  slots: {
    control:
      `input input-bordered flex items-center gap-2 h-auto min-h-[2.5rem] py-1 px-2 transition-[min-height] duration-200 ease-in-out data-[invalid]:input-error ${styles.control}`,
    controlMulti: "flex-wrap",
    inputContainer: "flex flex-wrap items-center gap-1 flex-1",
    input:
      "flex-1 min-w-0 bg-transparent border-none outline-none px-2 py-1 placeholder:text-base-content/50 focus:outline-none",
    trigger: `btn btn-ghost btn-xs btn-square shrink-0 ${styles.trigger}`,
    clearButton: "btn btn-ghost btn-xs btn-square shrink-0",
    tag: "badge badge-secondary gap-1 shrink-0",
    tagButton:
      "btn btn-ghost btn-xs btn-circle p-0 min-h-0 h-4 w-4 hover:bg-base-content/20",
    content:
      `dropdown-content z-50 w-full max-w-xs bg-base-100 rounded-box shadow-xl border border-base-300 p-1 mt-1 ${styles.content}`,
    listbox: "max-h-[20rem] overflow-y-auto space-y-0.5",
    item: `flex items-center justify-between rounded-btn px-3 py-2 text-sm cursor-pointer hover:bg-base-200 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed ${styles.item}`,
    itemIndicator:
      `ml-2 opacity-0 data-[selected]:opacity-100 ${styles.itemIndicator}`,
    icon: "w-4 h-4 shrink-0",
    description: "text-sm text-base-content/70 mt-2",
    errorMessage: "text-sm text-error mt-2 hidden data-[invalid]:block",
  },
});

// Export CSS module classes for direct use if needed
export { styles as animationStyles };
