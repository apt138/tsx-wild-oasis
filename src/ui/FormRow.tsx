import type { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  padding: 1.2rem 0;

  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  align-items: center;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowPropsWithLabel extends PropsWithChildren {
  label: string;
  error?: string;
  id: string;
}

interface FormRowPropsWithoutLabel extends PropsWithChildren {
  error?: string;
}

type FormRowProps = FormRowPropsWithLabel | FormRowPropsWithoutLabel;

function isFormWithLabelProps(
  props: FormRowProps
): props is FormRowPropsWithLabel {
  return "label" in props;
}

export default function FormRow(props: FormRowProps) {
  return (
    <StyledFormRow>
      {isFormWithLabelProps(props) && (
        <Label htmlFor={props.id}>{props.label}</Label>
      )}
      {props.children}
      {props.error && <Error>{props.error}</Error>}
    </StyledFormRow>
  );
}
