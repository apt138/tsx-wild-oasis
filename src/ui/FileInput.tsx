import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &::-webkit-file-upload-button {
    font: inherit;
    font-weight: 500;
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    margin-right: 1.2rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default function FileInput(props: ComponentPropsWithoutRef<"input">) {
  return <StyledInput type="file" {...props} />;
}
