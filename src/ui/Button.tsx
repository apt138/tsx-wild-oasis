import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

type ButtonSizeType = "sm" | "md" | "lg";
type ButtonVariationType = "primary" | "secondary" | "danger";

interface ButtonProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"button"> {
  size?: ButtonSizeType;
  variation?: ButtonVariationType;
}

type ButtonSizeProps = Record<ButtonSizeType, ReturnType<typeof css>>;
type ButtonVariationProps = Record<ButtonVariationType, ReturnType<typeof css>>;

const buttonSizeStyles: ButtonSizeProps = {
  sm: css`
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
  `,
  md: css`
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1.2rem 1.6rem;
  `,
  lg: css`
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
  `,
};

const buttonVariationStyles: ButtonVariationProps = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => buttonSizeStyles[props.size || "md"]}
  ${(props) => buttonVariationStyles[props.variation || "primary"]}
`;

export default function Button({
  size = "md",
  variation = "primary",
  ...props
}: ButtonProps) {
  return <StyledButton size={size} variation={variation} {...props} />;
}
