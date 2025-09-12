import { tv } from "tailwind-variants";
import { splitProps, children, JSX, createSignal, Show, createEffect } from "solid-js";
import { Transition } from "solid-transition-group";
import ChevronDown from "lucide-solid/icons/chevron-down";

export const collapsibleVariants = tv({
  base: "collapsible-root",
  variants: {
    variant: {
      default: "border border-base-300 rounded-box overflow-hidden",
      ghost: "bg-transparent",
      card: "bg-base-100 shadow-sm border border-base-200 rounded-box overflow-hidden",
      outline: "border-2 border-base-300 rounded-box overflow-hidden bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
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
  variants: {
    variant: {
      default: "bg-base-100",
      ghost: "bg-transparent hover:bg-base-200/30",
      card: "bg-base-50",
      outline: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const collapsibleContentVariants = tv({
  base: "overflow-hidden transition-all duration-300 ease-out",
  variants: {
    expanded: {
      true: "max-h-screen opacity-100",
      false: "max-h-0 opacity-0",
    },
  },
  defaultVariants: {
    expanded: false,
  },
});

export const collapsibleIconVariants = tv({
  base: "transition-transform duration-200 ease-out text-base-content/70",
  variants: {
    expanded: {
      true: "rotate-180",
      false: "rotate-0",
    },
  },
  defaultVariants: {
    expanded: false,
  },
});

type CollapsibleVariants = Parameters<typeof collapsibleVariants>[0];

export type CollapsibleProps = JSX.HTMLAttributes<HTMLDivElement> & 
  CollapsibleVariants & {
    title?: JSX.Element;
    subtitle?: JSX.Element;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onToggle?: (expanded: boolean) => void;
    disabled?: boolean;
    showIcon?: boolean;
  };

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
  const isExpanded = () => local.expanded !== undefined ? local.expanded : internalExpanded();
  
  const handleToggle = () => {
    if (local.disabled) return;
    
    const newExpanded = !isExpanded();
    
    // Update internal state if uncontrolled
    if (local.expanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    
    // Call onToggle callback
    local.onToggle?.(newExpanded);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      {...others}
      class={collapsibleVariants({
        variant: local.variant,
        class: local.class,
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
          <div class="font-medium text-base-content">
            {local.title}
          </div>
          {local.subtitle && (
            <div class="text-sm text-base-content/70 mt-1">
              {local.subtitle}
            </div>
          )}
        </div>
        
        {(local.showIcon !== false) && (
          <ChevronDown
            size={20}
            class={collapsibleIconVariants({
              expanded: isExpanded(),
            })}
          />
        )}
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
            <div class="p-4 bg-base-50 border-t border-base-200">
              {safeChildren()}
            </div>
          </Show>
        </Transition>
      </div>
    </div>
  );
};