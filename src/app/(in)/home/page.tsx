"use client";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { ClassroomsHome } from "@/modules/classroom/components/ClassroomsHome";
import { SuperAdminHome } from "@/modules/user/components/SuperAdminHome";

export default function HomePage() {
  const { loggedUser } = useAuth();

  if (loggedUser?.role === 3) {
    return <SuperAdminHome />;
  }

  return <ClassroomsHome />;
}
