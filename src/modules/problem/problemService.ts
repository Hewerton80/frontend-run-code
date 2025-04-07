import { IProblem } from "@/modules/problem/problemTypes";
import { envConfig } from "@/utils/envConfig";
import { dalay } from "@/utils/dalay";
import { redirect } from "next/navigation";
import { getRequestHeaders } from "@/utils/getRequestHeaders";

export const ProblemService = {
  getById: async (id: string) => {
    console.log("getById", id);
    const response = await fetch(`${envConfig.BASE_API_URL}/problem/${id}`, {
      cache: "no-cache",
      headers: getRequestHeaders(),
    });
    // console.log(response);
    if (response.status === 404) redirect("/404");
    const problem: IProblem = await response.json();
    if (!problem) redirect("/404");
    return problem;
  },

  getFromClassroomlist: async ({
    problemId,
    classroomId,
    listId,
  }: {
    problemId: string;
    listId: string;
    classroomId: string;
  }) => {
    const response = await fetch(
      `${envConfig.BASE_API_URL}/problem/${problemId}/classroom/${classroomId}/list/${listId}`,
      {
        cache: "no-cache",
        headers: getRequestHeaders(),
      }
    );
    if (response.status === 404) redirect("/404");
    const problem: IProblem = await response.json();
    if (!problem) redirect("/404");
    return problem;
  },
};
