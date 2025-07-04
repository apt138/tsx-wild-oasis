import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: 1/-1;
  grid-row: 1;
`;

export default function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}
