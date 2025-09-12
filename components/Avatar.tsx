import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const avatarVariants = tv({
  base: "avatar",
  variants: {
    status: {
      default: "",
      online: "online",
      offline: "offline",
    },
    placeholder: {
      default: "",
      placeholder: "placeholder",
    },
  },
  defaultVariants: {
    status: "default",
    placeholder: "default",
  },
});

export const avatarImageVariants = tv({
  base: "",
  variants: {
    size: {
      xs: "w-8",
      sm: "w-12",
      md: "w-16",
      lg: "w-24",
      xl: "w-32",
    },
    shape: {
      square: "rounded",
      rounded: "rounded-xl",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "lg",
    shape: "rounded",
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
        status: local.status,
        placeholder: local.placeholder,
        class: local.class,
      })}
    >
      <div
        class={avatarImageVariants({
          size: local.size,
          shape: local.shape,
        })}
      >
        {local.src ? (
          <img src={local.src} alt={local.alt || "Avatar"} />
        ) : (
          safeChildren()
        )}
      </div>
    </div>
  );
};