import Form from "../../ui/Form";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import type { InsertCabin } from "./types";
import FormRow from "../../ui/FormRow";

export default function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<InsertCabin>({
    defaultValues: {
      cabin_name: "",
      regular_price: 0,
      discount: 0,
      description: "",
      max_capacity: 1,
      image: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      const [cabin] = data;
      toast.success(`Cabin '${cabin.cabin_name}' created successfully.`);
      queryClient.invalidateQueries({ queryKey: ["cabin/getAll"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  function onSubmit(data: InsertCabin) {
    mutate(data);
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
        <FileInput id="cabin-image" name="cabinImage" disabled={isPending} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isPending}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create</Button>
      </FormRow>
    </Form>
  );
}
