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
  activeJobIds?: string[];
}
type LoggedUserUpdater = Updater<LoggedUser | null | undefined>;

type State = {
  loggedUser?: LoggedUser | null;
};

type Actions = {
  setLoggedUser: (updater: LoggedUser | null | LoggedUserUpdater) => void;
};

export const useLoggedUserStore = create<State & Actions>((set) => ({
  loggedUser: undefined,

  setLoggedUser: (updater: LoggedUser | null | LoggedUserUpdater) => {
    set((state) => ({
      loggedUser:
        typeof updater === "function"
          ? updater(state?.loggedUser || null)
          : updater,
    }));
  },
}));

export const useLoggedUser = () => {
  const loggedUser = useLoggedUserStore(useShallow((s) => s.loggedUser));

  const setLoggedUser = useLoggedUserStore(useShallow((s) => s.setLoggedUser));

  return { loggedUser, setLoggedUser };
};

export const clearLoggedUser = () => {
  useLoggedUserStore.getState().setLoggedUser(null);
};
