import { tv } from 'tailwind-variants';
import { splitProps, children, JSX } from 'solid-js';

export const kbdVariants = tv({
  base: 'kbd',
  variants: {
    size: {
      xs: 'kbd-xs',
      sm: 'kbd-sm',
      md: '',
      lg: 'kbd-lg',
      xl: 'kbd-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type KbdVariants = Parameters<typeof kbdVariants>[0];

export type KbdProps = JSX.HTMLAttributes<HTMLElement> & KbdVariants;

export const Kbd = (props: KbdProps) => {
  const [local, others] = splitProps(props, [
    'size',
    'class',
    'children',
  ]);

  const safeChildren = children(() => local.children);

  return (
    <kbd
      {...others}
      class={kbdVariants({
        size: local.size,
        class: local.class,
      })}
    >
      {safeChildren()}
    </kbd>
  );
};