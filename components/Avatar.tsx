import { children, splitProps, Show } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const avatarVariants = tv({
  base: "avatar",
  defaultVariants: {
    placeholder: "default",
    status: "default",
  },
  variants: {
    placeholder: {
      default: "",
      placeholder: "placeholder",
    },
    status: {
      default: "",
      offline: "offline",
      online: "online",
    },
  },
});

export const avatarImageVariants = tv({
  base: "",
  defaultVariants: {
    shape: "rounded",
    size: "lg",
  },
  variants: {
    shape: {
      circle: "rounded-full",
      rounded: "rounded-xl",
      square: "rounded",
    },
    size: {
      lg: "w-24",
      md: "w-16",
      sm: "w-12",
      xl: "w-32",
      xs: "w-8",
    },
  },
});

type AvatarVariants = Parameters<typeof avatarVariants>[0];
type AvatarImageVariants = Parameters<typeof avatarImageVariants>[0];

export type AvatarProps = JSX.HTMLAttributes<HTMLDivElement> &
  AvatarVariants &
  AvatarImageVariants & {
    src?: string;
    alt?: string;
    placeholder?: string;
  };

/**
 * A DaisyUI avatar that renders an `<img>` when `src` is provided, or falls back
 * to children (e.g. initials). Supports `shape` (circle, rounded, square),
 * `size` (xs–xl), and `status` (online/offline) indicator dots.
 */
export const Avatar = (props: AvatarProps) => {
  const [local, others] = splitProps(props, [
    "status",
    "placeholder",
    "size",
    "shape",
    "src",
    "alt",
    "class",
    "children",
  ]);

  const safeChildren = children(() => local.children);

  return (
    <div
      {...others}
      class={avatarVariants({
        class: local.class,
        placeholder: local.placeholder,
        status: local.status,
      })}
    >
      <div
        class={avatarImageVariants({
          shape: local.shape,
          size: local.size,
        })}
      >
        <Show when={local.src} fallback={safeChildren()}>
          <img src={local.src} alt={local.alt || "Avatar"} />
        </Show>
      </div>
    </div>
  );
};
