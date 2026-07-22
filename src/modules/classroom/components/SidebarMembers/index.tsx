import { usePagination } from "@/hooks/usePagination";
import { cn } from "@/utils/cn";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  CLASSROOM_USER_PER_PAGE,
  useFetchClassroomUsers,
} from "../../hooks/useFetchClassroomUsers";
import { IUser, RoleUser } from "@/modules/user/userTypets";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";

export const SideBarMembers = memo(() => {
  const params = useParams<{ classroomId: string }>();
  const { goToPage, paginationParams } = usePagination({
    initialParams: { perPage: CLASSROOM_USER_PER_PAGE },
  });

  const {
    refetchClassroomUsers,
    classroomUsersRecords,
    isFetchingClassroomUsers: isFetchingClassroomUsers,
    classroomUsersError,
  } = useFetchClassroomUsers(params?.classroomId!, paginationParams);

  const { teachers, students } = useMemo(() => {
    if (!classroomUsersRecords) {
      return { teachers: undefined, students: undefined };
    }
    const techers: IUser[] = [];
    const students: IUser[] = [];
    classroomUsersRecords?.data.forEach((user) => {
      if (user.role === RoleUser.TEACHER) techers.push(user);
      if (user.role === RoleUser.STUDENT) students.push(user);
    });
    return { teachers: techers, students: students };
  }, [classroomUsersRecords]);

  return (
    <aside
      className={cn(
        "hidden md:flex sticky top-14 h-[calc(100vh-3.75rem)] w-64 shrink-0",
        "border-l border-border/70 bg-background/40",
        "gap-2 overflow-auto",
      )}
    >
      <div className={cn("flex-1 overflow-y-auto px-2 py-4")}>
        <span className="px-2 pb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Professores - {teachers?.length || 0}
        </span>
        <ul className="flex flex-col space-y-0.5 mb-4">
          {teachers?.map((teacher) => (
            <li
              key={teacher.uuid}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-surface/60 ",
              )}
            >
              <GroupedUserInfo
                user={{
                  name: teacher.name,
                  surname: teacher.surname,
                  email: teacher.email,
                  avatarUrl: teacher?.avatarUrl,
                  avatarBgColor: teacher?.avatarBgColor,
                }}
              />
            </li>
          ))}
        </ul>
        <span className="px-2 pb-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Alunos - {students?.length || 0}
        </span>
        <ul className="flex flex-col space-y-0.5 mb-4">
          {students?.map((student) => (
            <li
              key={student.uuid}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-surface/60 ",
              )}
            >
              <GroupedUserInfo
                user={{
                  name: student.name,
                  surname: student.surname,
                  email: student.email,
                  avatarUrl: student?.avatarUrl,
                  avatarBgColor: student?.avatarBgColor,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
});

SideBarMembers.displayName = "SideBarMembers";
