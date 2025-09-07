import type {
  Component,
  ComponentProps,
  ParentProps,
  VoidProps,
  JSXElement,
} from "solid-js";
import { splitProps, Show, createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import * as CommandPrimitive from "cmdk-solid";
import { tv } from "tailwind-variants";

const commandVariants = tv({
  base: "flex h-full w-full flex-col overflow-hidden rounded-lg bg-base-100 text-base-content shadow-lg",
});

const commandInputVariants = tv({
  base: "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-base-content/50 disabled:cursor-not-allowed disabled:opacity-50",
});

const commandListVariants = tv({
  base: "max-h-[300px] overflow-y-auto overflow-x-hidden",
});

const commandEmptyVariants = tv({
  base: "py-6 text-center text-sm text-base-content/60",
});

const commandGroupVariants = tv({
  base: "overflow-hidden p-1 text-base-content [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-base-content/60",
});

const commandSeparatorVariants = tv({
  base: "h-px bg-base-300",
});

const commandItemVariants = tv({
  base: "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-primary/10 aria-selected:text-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
});

const commandShortcutVariants = tv({
  base: "ml-auto text-xs tracking-widest text-base-content/50",
});

const Command: Component<ParentProps<CommandPrimitive.CommandRootProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandRoot
      class={commandVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandInput: Component<VoidProps<CommandPrimitive.CommandInputProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      class="flex items-center border-b border-base-300 px-3"
      cmdk-input-wrapper=""
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2 h-4 w-4 shrink-0 opacity-50"
      >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <CommandPrimitive.CommandInput
        class={commandInputVariants({ class: local.class })}
        {...others}
      />
    </div>
  );
};

const CommandList: Component<ParentProps<CommandPrimitive.CommandListProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandList
      class={commandListVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandEmpty: Component<
  ParentProps<CommandPrimitive.CommandEmptyProps>
> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandEmpty
      class={commandEmptyVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandGroup: Component<
  ParentProps<CommandPrimitive.CommandGroupProps>
> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandGroup
      class={commandGroupVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandSeparator: Component<
  VoidProps<CommandPrimitive.CommandSeparatorProps>
> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandSeparator
      class={commandSeparatorVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandItem: Component<ParentProps<CommandPrimitive.CommandItemProps>> = (
  props,
) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <CommandPrimitive.CommandItem
      class={commandItemVariants({ class: local.class })}
      {...others}
    />
  );
};

const CommandShortcut: Component<ComponentProps<"span">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <span
      class={commandShortcutVariants({ class: local.class })}
      {...others}
    />
  );
};

type CommandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: JSXElement;
  keybinding?: string;
};

const CommandDialog: Component<CommandDialogProps> = (props) => {
  const [previousFocusElement, setPreviousFocusElement] = createSignal<HTMLElement | null>(null);
  let commandInputRef: HTMLElement | undefined;

  const handleClose = () => {
    props.onOpenChange(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === (props.keybinding || 'j')) {
      e.preventDefault();
      if (!props.open) {
        setPreviousFocusElement(document.activeElement as HTMLElement);
        props.onOpenChange(true);
      } else {
        handleClose();
      }
    }
    if (e.key === 'Escape' && props.open) {
      handleClose();
    }
  };

  // Focus management effects
  createEffect(() => {
    if (props.open) {
      // Store previous focus when opening
      if (!previousFocusElement()) {
        setPreviousFocusElement(document.activeElement as HTMLElement);
      }
      // Focus the command input
      setTimeout(() => {
        const input = document.querySelector('[cmdk-input]') as HTMLInputElement;
        if (input) {
          input.focus();
        }
      }, 0);
    } else {
      // Restore focus when closing
      const prevElement = previousFocusElement();
      if (prevElement) {
        setTimeout(() => {
          prevElement.focus();
          setPreviousFocusElement(null);
        }, 0);
      }
    }
  });

  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <Show when={props.open}>
      <Portal>
        <div
          class="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/50"
          onClick={handleClose}
        >
          <div
            class="w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandDialog,
};