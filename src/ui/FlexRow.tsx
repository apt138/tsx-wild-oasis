import type { PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface FlexRowProps extends PropsWithChildren {
  direction?: "row" | "column";
}
const StyledFlexRow = styled.div<FlexRowProps>`
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

export default function FlexRow({ direction = "row", ...props }: FlexRowProps) {
  return <StyledFlexRow direction={direction} {...props} />;
}
