import Form from "../../ui/Form";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { Cabin, InsertCabin } from "./types";
import FormRow from "../../ui/FormRow";

const initialValue: InsertCabin = {
  cabin_name: "",
  regular_price: 0,
  discount: 0,
  description: "",
  max_capacity: 1,
  image: "",
};

interface CreateCabinFormProps {
  cabin?: Cabin;
}

function isEditCabin(cabin: InsertCabin | Cabin | undefined): cabin is Cabin {
  if (!cabin) return false;
  return "cabin_id" in cabin;
}

export default function CreateCabinForm({ cabin }: CreateCabinFormProps) {
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
  const queryClient = useQueryClient();
  // mutation function for handing POST operation
  const { mutate: createMutation, isPending: isCreatePending } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      toast.success(`Cabin '${data.cabin_name}' created successfully.`);
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // mutation function for handling PATCH Operation
  const { mutate: updateMutation, isPending: isEditPending } = useMutation({
    // since cabin_id won't change during the session
    // making use of closure to pass the cabin_id to update function
    mutationFn: (data: Cabin) => updateCabin(cabin?.cabin_id, data),
    onSuccess: (data) => {
      toast.success(`Cabin '${data?.cabin_id}' updated sucessfully.`);
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const isPending = isCreatePending || isEditPending;
  function onSubmit(data: InsertCabin | Cabin) {
    if (isEditCabin(data)) {
      updateMutation(data);
    } else {
      createMutation(data);
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
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
        <Button variation="secondary" type="reset" disabled={isPending}>
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditCabin(cabin) ? "Edit" : "Create"}
        </Button>
      </FormRow>
    </Form>
  );
}
