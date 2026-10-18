import { children, splitProps, Show } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";
import type { TVReturnType } from "tailwind-variants";

type AvatarVariantsSchema = {
  placeholder: Record<"default" | "placeholder", string>;
  status: Record<"default" | "offline" | "online", string>;
};

export const avatarVariants: TVReturnType<
  AvatarVariantsSchema, undefined, "avatar", AvatarVariantsSchema, undefined
> = tv<
  AvatarVariantsSchema, [], {}, "avatar", undefined, undefined, AvatarVariantsSchema, undefined
>({
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

type AvatarImageVariantsSchema = {
  shape: Record<"circle" | "rounded" | "square", string>;
  size: Record<"lg" | "md" | "sm" | "xl" | "xs", string>;
};

export const avatarImageVariants: TVReturnType<
  AvatarImageVariantsSchema, undefined, "", AvatarImageVariantsSchema, undefined
> = tv<
  AvatarImageVariantsSchema, [], {}, "", undefined, undefined, AvatarImageVariantsSchema, undefined
>({
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
export const Avatar = (props: AvatarProps): JSX.Element => {
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
