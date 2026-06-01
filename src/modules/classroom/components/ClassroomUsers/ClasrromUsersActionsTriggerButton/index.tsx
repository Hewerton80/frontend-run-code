import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { ClassroomTeacherForm } from "../ClassromTeacherFormDialog";

interface ClasrromUsersActionsTriggerButtonProps {
  userUuid: string;
}

export const ClasrromUsersActionsTriggerButton = ({
  userUuid,
}: ClasrromUsersActionsTriggerButtonProps) => {
  const { loggedUser } = useLoggedUser();

  if (loggedUser?.role === RoleUser.STUDENT) {
    return <></>;
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton variantStyle="dark-ghost" icon={<BsThreeDots />} />
      </Dropdown.Trigger>

      <Dropdown.Content>
        <ClassroomTeacherForm.TriggerButton teacherId={userUuid}>
          <Dropdown.Item className="gap-2">
            <FaPen />
            Visualizar
          </Dropdown.Item>
        </ClassroomTeacherForm.TriggerButton>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
