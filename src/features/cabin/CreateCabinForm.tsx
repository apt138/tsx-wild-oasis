import styled from "styled-components";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";

const FormRow = styled.div`
  padding: 1.2rem 0;

  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

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

export default function CreateCabinForm() {
  return (
    <Form>
      <FormRow>
        <Label htmlFor="cabin-name">Cabin name</Label>
        <Input type="text" id="cabin-name" name="cabinName" />
      </FormRow>

      <FormRow>
        <Label htmlFor="max-capacity">Max capacity</Label>
        <Input type="number" id="max-capacity" name="maxCapacity" />
      </FormRow>

      <FormRow>
        <Label htmlFor="regular-price">Regular Price</Label>
        <Input type="number" id="regular-price" name="regularPrice" />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <TextArea id="description" name="description" />
      </FormRow>

      <FormRow>
        <Label htmlFor="cabin-image">Cabin photo</Label>
        <FileInput id="cabin-image" name="cabinImage" />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create</Button>
      </FormRow>
    </Form>
  );
}
