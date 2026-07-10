import { ButtonVariantStyle } from "@/components/ui/buttons/Button";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { ClassroomForm } from "../ClassroomFormDrawer";

interface ClassroomActionTriggerButtonProps {
  classroomId?: string | null;
  variantStyle?: ButtonVariantStyle;
}

export const ClasrromActionsTriggerButton = ({
  classroomId,
  variantStyle = "dark-ghost",
}: ClassroomActionTriggerButtonProps) => {
  const { loggedUser } = useLoggedUser();

  if (loggedUser?.role === RoleUser.STUDENT) {
    return <></>;
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton
          variantStyle={variantStyle}
          icon={<BsThreeDots className="text-muted-foreground" />}
        />
      </Dropdown.Trigger>

      <Dropdown.Content>
        <ClassroomForm.TriggerButton classroomId={classroomId}>
          <Dropdown.Item className="gap-2">
            <FaPen />
            Visualizar Turma
          </Dropdown.Item>
        </ClassroomForm.TriggerButton>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
