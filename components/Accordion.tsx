import { Accordion as KobalteAccordion } from "@kobalte/core/accordion";
import { tv } from "tailwind-variants";
import { JSX, children, For } from "solid-js";
import ChevronDown from "lucide-solid/icons/chevron-down";
import styles from "./accordion.module.css";

export const accordionVariants = tv({
  slots: {
    root: "w-full border border-base-300 rounded-lg overflow-hidden",
    item: "border-b border-base-300 last:border-b-0",
    header: "flex",
    trigger: "flex w-full items-center justify-between p-4 text-left font-medium hover:bg-base-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors",
    icon: "h-4 w-4",
    content: "text-sm",
    contentText: "p-4 pt-0"
  },
  variants: {
    variant: {
      default: {},
      bordered: {
        root: "border-2",
        item: "border-b-2 last:border-b-0"
      },
      ghost: {
        root: "border-0 bg-transparent",
        item: "border-b border-base-300 last:border-b-0",
        trigger: "hover:bg-base-200"
      }
    },
    size: {
      sm: {
        trigger: "p-3 text-sm",
        contentText: "p-3 pt-0 text-sm"
      },
      md: {},
      lg: {
        trigger: "p-5 text-lg",
        contentText: "p-5 pt-0"
      }
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});

export interface AccordionItem {
  value: string;
  title: string;
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

export function Accordion(props: AccordionProps): JSX.Element {
  const tvStyles = accordionVariants({ variant: props.variant, size: props.size });

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
              <div class={tvStyles.contentText()}>
                {item.content}
              </div>
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
