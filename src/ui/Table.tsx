import { createContext, useContext, type PropsWithChildren } from "react";
import styled from "styled-components";
interface TableContextProps {
  columns: string;
}
const TableContext = createContext<TableContextProps | null>(null);
function useTableContext() {
  const context = useContext(TableContext);
  if (context === null || context === undefined) {
    throw new Error("Table Context was used outside of Table Provider");
  }
  return context;
}

interface TableProps extends PropsWithChildren, TableContextProps {}

const StyledTable = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;

  width: 100%;
`;

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

const CommonRow = styled.div<TableContextProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  column-gap: 2.4rem;
`;

const StyledHeader = styled(CommonRow)`
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  padding: 1.6rem 1.2rem;
  letter-spacing: 0.4px;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header({ children }: PropsWithChildren) {
  const { columns } = useTableContext();
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}
const StyleRow = styled(CommonRow)`
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
function Row({ children }: PropsWithChildren) {
  const { columns } = useTableContext();
  return (
    <StyleRow role="row" columns={columns}>
      {children}
    </StyleRow>
  );
}
function Body() {}

const Footer = styled.footer``;

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
