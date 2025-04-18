"use client";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { StudantHome } from "@/modules/user/components/StudantHome";
import { SuperAdminHome } from "@/modules/user/components/SuperAdminHome";

export default function HomePage() {
  const { loggedUser } = useAuth();

  if (loggedUser?.role === 3) {
    return <SuperAdminHome />;
  }

  return <StudantHome />;
}
