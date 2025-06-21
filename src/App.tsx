import GlobalStyle from "./GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import FlexRow from "./ui/FlexRow";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <FlexRow>
        <Heading as="h1">Hello world</Heading>
        <Button>Check-in</Button>
      </FlexRow>
      <Input type="number" placeholder="Number" />
    </>
  );
}
