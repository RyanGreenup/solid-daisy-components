import { Accordion as KobalteAccordion } from "@kobalte/core/accordion";
import ChevronDown from "lucide-solid/icons/chevron-down";
import { For } from "solid-js";
import { tv } from "tailwind-variants";

import styles from "./accordion.module.css";

import type { JSX } from "solid-js";

export const accordionVariants = tv({
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  slots: {
    content: "text-sm",
    contentText: "p-4 pt-0",
    header: "flex",
    icon: "h-4 w-4",
    item: "border-b border-base-300 last:border-b-0",
    root: "w-full border border-base-300 rounded-lg overflow-hidden",
    trigger:
      "flex w-full items-center justify-between p-4 text-left font-medium hover:bg-base-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors",
  },
  variants: {
    size: {
      lg: {
        contentText: "p-5 pt-0",
        trigger: "p-5 text-lg",
      },
      md: {},
      sm: {
        contentText: "p-3 pt-0 text-sm",
        trigger: "p-3 text-sm",
      },
    },
    variant: {
      bordered: {
        item: "border-b-2 last:border-b-0",
        root: "border-2",
      },
      default: {},
      ghost: {
        item: "border-b border-base-300 last:border-b-0",
        root: "border-0 bg-transparent",
        trigger: "hover:bg-base-200",
      },
    },
  },
});

export interface AccordionItem {
  value: string;
  title: string | JSX.Element;
  content: JSX.Element;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: "default" | "bordered" | "ghost";
  size?: "sm" | "md" | "lg";
  multiple?: boolean;
  collapsible?: boolean;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  class?: string;
}

/**
 * Styled accordion built on Kobalte's `Accordion` primitive. Iterates over the
 * `items` array and renders each as a collapsible panel with a chevron trigger,
 * animated open/close transition, and DaisyUI theming controlled by `variant`
 * and `size`. Supports single or multiple expanded panels via `multiple`, and
 * both controlled (`value`/`onChange`) and uncontrolled (`defaultValue`) modes.
 */
export function Accordion(props: AccordionProps): JSX.Element {
  const tvStyles = accordionVariants({
    size: props.size,
    variant: props.variant,
  });

  return (
    <KobalteAccordion
      multiple={props.multiple}
      collapsible={props.collapsible}
      defaultValue={props.defaultValue}
      value={props.value}
      onChange={props.onChange}
      class={tvStyles.root({ class: props.class })}
    >
      <For each={props.items}>
        {(item) => (
          <KobalteAccordion.Item
            value={item.value}
            disabled={item.disabled}
            class={tvStyles.item()}
          >
            <KobalteAccordion.Header class={tvStyles.header()}>
              <KobalteAccordion.Trigger class={tvStyles.trigger()}>
                {item.title}
                <ChevronDown class={`${tvStyles.icon()} ${styles.accordionIcon}`} aria-hidden />
              </KobalteAccordion.Trigger>
            </KobalteAccordion.Header>
            <KobalteAccordion.Content class={`${tvStyles.content()} ${styles.accordionContent}`}>
              <div class={tvStyles.contentText()}>{item.content}</div>
            </KobalteAccordion.Content>
          </KobalteAccordion.Item>
        )}
      </For>
    </KobalteAccordion>
  );
}

// For backward compatibility and advanced usage, export the individual components
export const AccordionRoot = KobalteAccordion;
export const AccordionItem = KobalteAccordion.Item;
export const AccordionHeader = KobalteAccordion.Header;
export const AccordionTrigger = KobalteAccordion.Trigger;
export const AccordionContent = KobalteAccordion.Content;
