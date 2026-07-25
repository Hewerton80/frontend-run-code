import { RoleUser } from "@/modules/user/userTypets";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export interface LoggedUser {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  avatarUrl: string;
  avatarBgColor: string;
  role: RoleUser;
  createdAt: string;
  username: string;
}

type State = {
  loggedUser?: LoggedUser | null;
};

type Actions = {
  setLoggedUser: (User: LoggedUser | null) => void;
};

export const useLoggedUserStore = create<State & Actions>((set) => ({
  loggedUser: undefined,

  setLoggedUser: (loggedUser: LoggedUser | null) => set(() => ({ loggedUser })),
}));

export const useLoggedUser = () => {
  const loggedUser = useLoggedUserStore(useShallow((s) => s.loggedUser));

  const setLoggedUser = useLoggedUserStore(useShallow((s) => s.setLoggedUser));

  return { loggedUser, setLoggedUser };
};

export const clearLoggedUser = () => {
  useLoggedUserStore.getState().setLoggedUser(null);
};
