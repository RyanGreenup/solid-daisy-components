import { tv } from "tailwind-variants";
import { splitProps, children, JSX } from "solid-js";

export const stepsVariants = tv({
  base: "steps",
  variants: {
    direction: {
      horizontal: "steps-horizontal",
      vertical: "steps-vertical",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export const stepVariants = tv({
  base: "step",
  variants: {
    color: {
      default: "",
      neutral: "step-neutral",
      primary: "step-primary",
      secondary: "step-secondary",
      accent: "step-accent",
      info: "step-info",
      success: "step-success",
      warning: "step-warning",
      error: "step-error",
    },
  },
  defaultVariants: {
    color: "default",
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

export const StepIcon = (props: StepIconProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <span
      {...others}
      class={stepIconVariants({ class: local.class })}
    >
      {safeChildren()}
    </span>
  );
};

export const Step = (props: StepProps) => {
  const [local, others] = splitProps(props, ["color", "class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <li
      {...others}
      class={stepVariants({
        color: local.color,
        class: local.class,
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
        direction: local.direction,
        class: local.class,
      })}
    >
      {safeChildren()}
    </ul>
  );
};

export const Steps = Object.assign(StepsComponent, {
  Step: Step,
  Icon: StepIcon,
});