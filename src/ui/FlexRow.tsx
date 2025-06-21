import styled, { css } from "styled-components";

interface FlexRowProps {
  direction?: "row" | "column";
}
const FlexRow = styled.div<FlexRowProps>`
  display: flex;
  ${(props) =>
    props.direction === "row" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.direction === "column" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

FlexRow.defaultProps = {
  direction: "row",
};
export default FlexRow;
