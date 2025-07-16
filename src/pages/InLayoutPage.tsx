import { Header } from "@/components/common/Header";
import { SideBarTamplateWrapper } from "@/components/templates/SideBarTamplateWrapper";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { SplashScreen } from "@/components/ui/feedback/SplashScreen";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { isNull, isUndefined } from "@/utils/isType";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function InLayoutPage() {
  const { logout } = useLogout();

  const {
    refetchLoggedUser,
    isErrorUser,
    hasNotAccess,
    isLoadingUser,
    loggedUser,
  } = useAuth();

  useEffect(() => {
    refetchLoggedUser();
  }, [refetchLoggedUser]);

  useEffect(() => {
    if (hasNotAccess) {
      logout();
    }
  }, [hasNotAccess, logout]);

  if (isErrorUser || isNull(loggedUser)) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <FeedBackError onTryAgain={refetchLoggedUser} />
      </div>
    );
  }

  if (isLoadingUser || isUndefined(loggedUser)) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {loggedUser?.role === 3 ? (
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
