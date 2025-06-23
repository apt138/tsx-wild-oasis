import Form from "../../ui/Form";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import type { Cabin, InsertCabin, UpdateCabin } from "./types";
import FormRow from "../../ui/FormRow";
import useCreateCabinMutation from "./hooks/useCreateCabinMutation";
import useUpdateCabinMutation from "./hooks/useUpdateCabinMutation";

const initialValue: UpdateCabin = {
  cabin_name: "",
  discount: 0,
  description: "",
  image: "",
};

interface CreateCabinFormProps {
  onCloseModal?: () => void;
  cabin?: Cabin;
}

function isEditCabin(cabin: InsertCabin | Cabin | undefined): cabin is Cabin {
  if (!cabin) return false;
  return "cabin_id" in cabin;
}

export default function CreateCabinForm({
  cabin,
  onCloseModal,
}: CreateCabinFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InsertCabin>({
    // if edit flow , populate the form with cabin data.
    // else populate with default value
    defaultValues: cabin || initialValue,
  });
  // mutation function for handing POST operation
  const { isCreatePending, createMutationFn } = useCreateCabinMutation();
  // mutation function for handling PATCH Operation
  const { isUpdatePending, updateMutationFn } = useUpdateCabinMutation();
  const isPending = isCreatePending || isUpdatePending;
  function onSubmit(data: InsertCabin | Cabin) {
    if (isEditCabin(data)) {
      updateMutationFn({ id: cabin?.cabin_id, cabin: data });
    } else {
      createMutationFn(data, {
        onSuccess: () => {
          reset();
        },
      });
    }
    onCloseModal?.();
  }
  return (
    <Form
      kind={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
    >
      <FormRow
        label="Cabin name"
        id="cabin-name"
        error={errors?.cabin_name?.message}
      >
        <Input
          type="text"
          id="cabin-name"
          disabled={isPending}
          {...register("cabin_name", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow
        label="Max Capacity"
        id="max-capacity"
        error={errors?.max_capacity?.message}
      >
        <Input
          type="number"
          id="max-capacity"
          disabled={isPending}
          {...register("max_capacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity must be greater than or equal to 1.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        id="regular-price"
        error={errors?.regular_price?.message}
      >
        <Input
          type="number"
          id="regular-price"
          step={0.01}
          disabled={isPending}
          {...register("regular_price", {
            valueAsNumber: true,
            required: "This field is required",
            min: {
              value: 1,
              message: "Price must be greater than or equal to 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" id="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          step={0.01}
          defaultValue={0}
          disabled={isPending}
          {...register("discount", {
            valueAsNumber: true,
            required: "This field is required.",
            validate: (value) =>
              value! <= getValues().regular_price ||
              "Discount must be less than or equal to price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        id="description"
        error={errors?.description?.message}
      >
        <TextArea
          id="description"
          disabled={isPending}
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow
        label="Cabin Photo"
        id="cabin-image"
        error={errors?.image?.message}
      >
        <FileInput
          id="cabin-image"
          disabled={isPending}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditCabin(cabin) ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}
