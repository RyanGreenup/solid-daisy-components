import ChevronDown from "lucide-solid/icons/chevron-down";
import { Show, children, createSignal, splitProps } from "solid-js";
import { Transition } from "solid-transition-group";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const collapsibleVariants = tv({
  base: "collapsible-root",
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      card: "bg-base-100 shadow-sm border border-base-200 rounded-box overflow-hidden",
      default: "border border-base-300 rounded-box overflow-hidden",
      ghost: "bg-transparent",
      outline: "border-2 border-base-300 rounded-box overflow-hidden bg-transparent",
    },
  },
});

export const collapsibleHeaderVariants = tv({
  base: [
    "flex items-center justify-between w-full p-4 text-left",
    "transition-colors duration-200",
    "hover:bg-base-200/50 active:bg-base-200",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    "cursor-pointer select-none",
  ],
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      card: "bg-base-50",
      default: "bg-base-100",
      ghost: "bg-transparent hover:bg-base-200/30",
      outline: "bg-transparent",
    },
  },
});

export const collapsibleContentVariants = tv({
  base: "overflow-hidden transition-all duration-300 ease-out",
  defaultVariants: {
    expanded: false,
  },
  variants: {
    expanded: {
      false: "max-h-0 opacity-0",
      true: "max-h-screen opacity-100",
    },
  },
});

export const collapsibleIconVariants = tv({
  base: "transition-transform duration-200 ease-out text-base-content/70",
  defaultVariants: {
    expanded: false,
  },
  variants: {
    expanded: {
      false: "rotate-0",
      true: "rotate-180",
    },
  },
});

type CollapsibleVariants = Parameters<typeof collapsibleVariants>[0];

export type CollapsibleProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "title" | "onToggle"> &
  CollapsibleVariants & {
    title?: JSX.Element;
    subtitle?: JSX.Element;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onToggle?: (expanded: boolean) => void;
    disabled?: boolean;
    showIcon?: boolean;
  };

/**
 * Animated expand/collapse panel with a clickable header, optional chevron icon, title,
 * and subtitle. Supports both controlled (`expanded` + `onToggle`) and uncontrolled
 * (`defaultExpanded`) modes, keyboard activation (Enter/Space), and four visual variants:
 * default, card, ghost, and outline.
 */
export const Collapsible = (props: CollapsibleProps) => {
  const [local, others] = splitProps(props, [
    "variant",
    "class",
    "children",
    "title",
    "subtitle",
    "defaultExpanded",
    "expanded",
    "onToggle",
    "disabled",
    "showIcon",
  ]);

  const safeChildren = children(() => local.children);

  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = createSignal(local.defaultExpanded ?? false);

  // Use controlled prop if provided, otherwise use internal state
  const isExpanded = () => (local.expanded !== undefined ? local.expanded : internalExpanded());

  const handleToggle = () => {
    if (local.disabled) {
      return;
    }

    const newExpanded = !isExpanded();

    // Update internal state if uncontrolled
    if (local.expanded === undefined) {
      setInternalExpanded(newExpanded);
    }

    // Call onToggle callback
    local.onToggle?.(newExpanded);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      {...others}
      class={collapsibleVariants({
        class: local.class,
        variant: local.variant,
      })}
    >
      {/* Header */}
      <button
        type="button"
        disabled={local.disabled}
        class={collapsibleHeaderVariants({
          variant: local.variant,
        })}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded()}
        aria-controls="collapsible-content"
      >
        <div class="flex-1 text-left">
          <div class="font-medium text-base-content">{local.title}</div>
          <Show when={local.subtitle}>
            <div class="text-sm text-base-content/70 mt-1">{local.subtitle}</div>
          </Show>
        </div>

        <Show when={local.showIcon !== false}>
          <ChevronDown
            size={20}
            class={collapsibleIconVariants({
              expanded: isExpanded(),
            })}
          />
        </Show>
      </button>

      {/* Content */}
      <div
        id="collapsible-content"
        class={collapsibleContentVariants({
          expanded: isExpanded(),
        })}
      >
        <Transition
          enterActiveClass="transition-all duration-300 ease-out"
          enterClass="opacity-0 transform translate-y-2"
          enterToClass="opacity-100 transform translate-y-0"
          exitActiveClass="transition-all duration-200 ease-in"
          exitClass="opacity-100 transform translate-y-0"
          exitToClass="opacity-0 transform translate-y-2"
        >
          <Show when={isExpanded()}>
            <div class="p-4 bg-base-50 border-t border-base-200">{safeChildren()}</div>
          </Show>
        </Transition>
      </div>
    </div>
  );
};
