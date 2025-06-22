import UpdateSettingForm from "../features/setting/UpdateSettingForm";
import FlexRow from "../ui/FlexRow";
import Heading from "../ui/Heading";

export default function Setting() {
  return (
    <>
      <FlexRow>
        <Heading as="h2">Update Settings</Heading>
      </FlexRow>
      <FlexRow>
        <UpdateSettingForm />
      </FlexRow>
    </>
  );
}
