import AlertTriangle from "lucide-solid/icons/alert-triangle";
import CheckCircle from "lucide-solid/icons/check-circle";
import InfoCircle from "lucide-solid/icons/info";
import XCircle from "lucide-solid/icons/x-circle";
import { splitProps, children, JSX, Show } from "solid-js";
import { tv } from "tailwind-variants";

export const alertVariants = tv({
  base: "alert",
  variants: {
    color: {
      default: "",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-error",
    },
    style: {
      default: "",
      outline: "alert-outline",
      dash: "alert-dash",
      soft: "alert-soft",
    },
    orientation: {
      default: "",
      vertical: "alert-vertical",
      horizontal: "alert-horizontal",
    },
  },
  defaultVariants: {
    color: "default",
    style: "default",
    orientation: "default",
  },
});

type AlertVariants = Parameters<typeof alertVariants>[0];

export type AlertProps = JSX.HTMLAttributes<HTMLDivElement> &
  AlertVariants & {
    showIcon?: boolean;
  };

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
      case "info":
        return InfoCircle;
      case "success":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "error":
        return XCircle;
      default:
        return InfoCircle;
    }
  };

  const IconComponent = getIcon();

  return (
    <div
      {...others}
      role={local.role || "alert"}
      class={alertVariants({
        color: local.color,
        style: local.style,
        orientation: local.orientation,
        class: local.class,
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
