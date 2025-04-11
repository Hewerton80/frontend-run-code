"use client";
import { Header } from "@/components/common/Header";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { SplashScreen } from "@/components/ui/feedback/SplashScreen";
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

  const { refetchLoggedUser, errorUser, isLoadingUser, loggedUser } = useAuth();

  useEffect(() => {
    const status = (errorUser as any)?.response?.status;
    if (status === 401) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [errorUser, router]);

  if (isUndefined(loggedUser) || isLoadingUser) {
    return <SplashScreen />;
  }

  if (isNull(loggedUser)) {
    return <FeedBackError onTryAgain={refetchLoggedUser} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 h-full w-full">{children}</div>
    </div>
  );
}
