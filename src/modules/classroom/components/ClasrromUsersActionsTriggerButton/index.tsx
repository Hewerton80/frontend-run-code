import { ButtonVariantStyle } from "@/components/ui/buttons/Button";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

interface ClasrromUsersActionsTriggerButtonProps {
  // classrroomId: string;
  onClickToEditUser?: () => void;
  variantStyle?: ButtonVariantStyle;
}

export const ClasrromUsersActionsTriggerButton = ({
  // classrroomId,
  onClickToEditUser,
}: ClasrromUsersActionsTriggerButtonProps) => {
  const { loggedUser } = useAuth();

  if (loggedUser?.role === 1) {
    return <></>;
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton variantStyle="dark-ghost" icon={<BsThreeDots />} />
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item onClick={onClickToEditUser} className="gap-2">
          {/* <ProgressLink href={`/update-classroom/${classroom?.uuid}`}> */}
          <FaPen />
          Visualizar
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
