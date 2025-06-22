import type React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettingQuery from "./hooks/useSettingQuery";
import useUpdateSettingMutation from "./hooks/useUpdateSettingMutation";

export default function UpdateSettingForm() {
  const { settings, isLoadingSettings } = useSettingQuery();
  const {
    min_booking_length,
    max_booking_length,
    max_guest_per_booking,
    breakfast_price,
  } = settings || {};
  const { isUpdateSettingPending, updateSettingMutationFn } =
    useUpdateSettingMutation();

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const value = e.target.value;
    if (!value) return;
    updateSettingMutationFn({ [field]: value });
  }

  if (isLoadingSettings) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking" id="min-nights">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdateSettingPending}
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking" id="max-nights">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdateSettingPending}
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking" id="max-guests">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdateSettingPending}
          defaultValue={max_guest_per_booking}
          onBlur={(e) => handleUpdate(e, "max_guest_per_booking")}
        />
      </FormRow>

      <FormRow label="Breakfast price" id="breakfast">
        <Input
          type="number"
          id="breakfast"
          step={0.01}
          disabled={isUpdateSettingPending}
          defaultValue={breakfast_price || 0}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}
