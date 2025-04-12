"use client";
import { Header } from "@/components/common/Header";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { SplashScreen } from "@/components/ui/feedback/SplashScreen";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { isNull, isUndefined } from "@/utils/isType";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [, , clearAccessToken] = useSessionStorage("access_token");

  const {
    refetchLoggedUser,
    isErrorUser,
    hasNotAccess,
    isLoadingUser,
    loggedUser,
  } = useAuth();

  useEffect(() => {
    if (hasNotAccess) {
      clearAccessToken();
      router.replace("/login");
    }
  }, [hasNotAccess, router, clearAccessToken]);

  if (isLoadingUser || isUndefined(loggedUser)) {
    return <SplashScreen />;
  }

  if (isErrorUser || isNull(loggedUser)) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <FeedBackError onTryAgain={refetchLoggedUser} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 h-full w-full">{children}</div>
    </div>
  );
}
