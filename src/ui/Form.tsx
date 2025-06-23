import type { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

interface FormProps extends ComponentPropsWithoutRef<"form"> {
  kind?: "modal" | "regular";
}

const StyledForm = styled.form<FormProps>`
  overflow: hidden;
  font-size: 1.4rem;

  ${(props) =>
    props.kind === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-sm);
      border: 1px solid var(--color-grey-100);
    `}

  ${(props) =>
    props.kind === "modal" &&
    css`
      width: 80rem;
    `}
`;

export default function Form({ kind = "regular", ...props }: FormProps) {
  return <StyledForm kind={kind} {...props} />;
}
