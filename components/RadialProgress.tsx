import { splitProps, children, JSX, createMemo } from "solid-js";
import { tv } from "tailwind-variants";

export const radialProgressVariants = tv({
  base: "radial-progress",
});

type RadialProgressVariants = Parameters<typeof radialProgressVariants>[0];

export type RadialProgressProps = JSX.HTMLAttributes<HTMLDivElement> &
  RadialProgressVariants & {
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

  const customStyle = createMemo((): JSX.CSSProperties => {
    const baseStyle: JSX.CSSProperties = {
      "--value": local.value.toString(),
    };

    if (local.size) {
      baseStyle["--size"] = local.size;
    }
    if (local.thickness) {
      baseStyle["--thickness"] = local.thickness;
    }

    if (local.style && typeof local.style === "object") {
      return { ...baseStyle, ...local.style };
    }

    return baseStyle;
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
