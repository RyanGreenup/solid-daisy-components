import { tv } from "tailwind-variants";
import { splitProps, children, JSX, createMemo } from "solid-js";

export const radialProgressVariants = tv({
  base: "radial-progress",
});

type RadialProgressVariants = Parameters<typeof radialProgressVariants>[0];

export type RadialProgressProps = JSX.HTMLAttributes<HTMLDivElement> & RadialProgressVariants & {
  value: number;
  size?: string;
  thickness?: string;
  max?: number;
};

export const RadialProgress = (props: RadialProgressProps) => {
  const [local, others] = splitProps(props, [
    "value",
    "size",
    "thickness",
    "max",
    "class",
    "children",
    "style",
    "role",
    "aria-valuenow",
    "aria-valuemax",
  ]);

  const safeChildren = children(() => local.children);
  const maxValue = () => local.max ?? 100;
  
  const customStyle = createMemo(() => {
    const baseStyle = {
      "--value": local.value.toString(),
      ...(local.size && { "--size": local.size }),
      ...(local.thickness && { "--thickness": local.thickness }),
    } as JSX.CSSProperties;

    return local.style ? { ...baseStyle, ...local.style } : baseStyle;
  });

  return (
    <div
      {...others}
      role={local.role || "progressbar"}
      aria-valuenow={local["aria-valuenow"] ?? local.value}
      aria-valuemax={local["aria-valuemax"] ?? maxValue()}
      class={radialProgressVariants({ class: local.class })}
      style={customStyle()}
    >
      {safeChildren()}
    </div>
  );
};