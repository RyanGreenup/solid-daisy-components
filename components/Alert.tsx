import AlertTriangle from "lucide-solid/icons/alert-triangle";
import CheckCircle from "lucide-solid/icons/check-circle";
import InfoCircle from "lucide-solid/icons/info";
import XCircle from "lucide-solid/icons/x-circle";
import { Show, children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const alertVariants = tv({
  base: "alert",
  defaultVariants: {
    color: "default",
    orientation: "default",
    style: "default",
  },
  variants: {
    color: {
      default: "",
      error: "alert-error",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
    },
    orientation: {
      default: "",
      horizontal: "alert-horizontal",
      vertical: "alert-vertical",
    },
    style: {
      dash: "alert-dash",
      default: "",
      outline: "alert-outline",
      soft: "alert-soft",
    },
  },
});

type AlertVariants = Parameters<typeof alertVariants>[0];

export type AlertProps = JSX.HTMLAttributes<HTMLDivElement> &
  AlertVariants & {
    showIcon?: boolean;
  };

/**
 * A DaisyUI alert `<div>` that renders a contextual icon (info, success, warning,
 * or error) alongside child content. Use `color` to set the semantic tone,
 * `style` for visual treatment (outline, soft, dash), and `showIcon={false}` to hide the icon.
 */
const AlertComponent = (props: AlertProps) => {
  const [local, others] = splitProps(props, [
    "color",
    "style",
    "orientation",
    "class",
    "children",
    "role",
    "showIcon",
  ]);

  const safeChildren = children(() => local.children);

  const getIcon = () => {
    switch (local.color) {
      case "info": {
        return InfoCircle;
      }
      case "success": {
        return CheckCircle;
      }
      case "warning": {
        return AlertTriangle;
      }
      case "error": {
        return XCircle;
      }
      default: {
        return InfoCircle;
      }
    }
  };

  const IconComponent = getIcon();

  return (
    <div
      {...others}
      role={local.role || "alert"}
      class={alertVariants({
        class: local.class,
        color: local.color,
        orientation: local.orientation,
        style: local.style,
      })}
    >
      <Show when={local.showIcon !== false}>
        <IconComponent size={20} />
      </Show>
      {safeChildren()}
    </div>
  );
};

export const Alert = AlertComponent;
