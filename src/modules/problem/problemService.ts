import { IProblem } from "@/modules/problem/problemTypes";
import { envConfig } from "@/utils/envConfig";
import { dalay } from "@/utils/dalay";
import { redirect } from "next/navigation";

export const ProblemService = {
  getById: async (id: string) => {
    const response = await fetch(`${envConfig.BASE_API_URL}/problem/${id}`, {
      cache: "no-cache",
    });
    if (response.status === 404) redirect("/404");
    const problem: IProblem = await response.json();
    if (!problem) redirect("/404");
    return problem;
  },
};
