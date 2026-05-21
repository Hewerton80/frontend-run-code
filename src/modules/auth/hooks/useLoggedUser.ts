import { IUser } from "@/modules/user/userTypets";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type State = {
  loggedUser?: IUser | null;
};

type Actions = {
  setLoggedUser: (User: IUser | null) => void;
};

export const useLoggedUserStore = create<State & Actions>((set) => ({
  loggedUser: undefined,

  setLoggedUser: (loggedUser: IUser | null) => set(() => ({ loggedUser })),
}));

export const useLoggedUser = () => {
  const loggedUser = useLoggedUserStore(useShallow((s) => s.loggedUser));

  const setLoggedUser = useLoggedUserStore(useShallow((s) => s.setLoggedUser));

  return { loggedUser, setLoggedUser };
};
