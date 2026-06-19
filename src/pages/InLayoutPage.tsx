import { Header } from "@/components/common/Header";
import { SideBarTamplateWrapper } from "@/components/templates/SideBarTamplateWrapper";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { SplashScreen } from "@/components/ui/feedback/SplashScreen";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { RoleUser } from "@/modules/user/userTypets";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useFetchPoolingSubmissionsResult } from "@/modules/submission/hooks/useFetchPoolingSubmissionsResult";

export default function InLayoutPage() {
  const { logout } = useLogout();
  const [access_token] = useSessionStorage("access_token");
  const { loggedUser } = useLoggedUser();

  const { fetchMe, errorUser, isErrorUser } = useAuth();

  useFetchPoolingSubmissionsResult();

  useEffect(() => {
    if (loggedUser) return;

    if (!access_token) {
      logout();
      return;
    }
    fetchMe();
  }, [fetchMe, loggedUser, access_token, logout]);

  useEffect(() => {
    if (errorUser) logout();
  }, [errorUser, logout]);

  if (isErrorUser) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <FeedBackError onTryAgain={fetchMe} />
      </div>
    );
  }

  if (!loggedUser) return <SplashScreen />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {loggedUser?.role === RoleUser.SUPER_ADMIN ? (
        <SideBarTamplateWrapper>
          <Outlet />
        </SideBarTamplateWrapper>
      ) : (
        <div className="flex flex-1 h-full w-full">
          <Outlet />
        </div>
      )}
    </div>
  );
}

// return <Outlet />;
