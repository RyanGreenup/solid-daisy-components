import { children, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

import type { JSX } from "solid-js";

export const stepsVariants = tv({
  base: "steps",
  defaultVariants: {
    direction: "horizontal",
  },
  variants: {
    direction: {
      horizontal: "steps-horizontal",
      vertical: "steps-vertical",
    },
  },
});

export const stepVariants = tv({
  base: "step",
  defaultVariants: {
    color: "default",
  },
  variants: {
    color: {
      accent: "step-accent",
      default: "",
      error: "step-error",
      info: "step-info",
      neutral: "step-neutral",
      primary: "step-primary",
      secondary: "step-secondary",
      success: "step-success",
      warning: "step-warning",
    },
  },
});

export const stepIconVariants = tv({
  base: "step-icon",
});

type StepsVariants = Parameters<typeof stepsVariants>[0];
type StepVariants = Parameters<typeof stepVariants>[0];
type StepIconVariants = Parameters<typeof stepIconVariants>[0];

export type StepsProps = JSX.HTMLAttributes<HTMLUListElement> & StepsVariants;

export type StepProps = JSX.LiHTMLAttributes<HTMLLIElement> & StepVariants;

export type StepIconProps = JSX.HTMLAttributes<HTMLSpanElement> & StepIconVariants;

/**
 * Custom icon rendered inside a DaisyUI step indicator, applied via the
 * `step-icon` class on a `<span>`. Use to replace the default step number
 * with an SVG icon or other inline content.
 */
export const StepIcon = (props: StepIconProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <span {...others} class={stepIconVariants({ class: local.class })}>
      {safeChildren()}
    </span>
  );
};

/**
 * Individual step item in a DaisyUI steps list, rendered as an `<li>` with
 * the `step` class. The `color` prop applies a semantic step color
 * (`primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`,
 * or `neutral`) to indicate step status.
 */
export const Step = (props: StepProps) => {
  const [local, others] = splitProps(props, ["color", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li
      {...others}
      class={stepVariants({
        class: local.class,
        color: local.color,
      })}
    >
      {safeChildren()}
    </li>
  );
};

const StepsComponent = (props: StepsProps) => {
  const [local, others] = splitProps(props, ["direction", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <ul
      {...others}
      class={stepsVariants({
        class: local.class,
        direction: local.direction,
      })}
    >
      {safeChildren()}
    </ul>
  );
};

export const Steps = Object.assign(StepsComponent, {
  Icon: StepIcon,
  Step,
});
