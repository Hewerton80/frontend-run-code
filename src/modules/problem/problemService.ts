import { IProblem } from "@/modules/problem/problemTypes";
import { config } from "@/utils/config";
import { redirect } from "next/navigation";

export const ProblemService = {
  getById: async (id: string) => {
    const response = await fetch(`${config.BASE_API_URL}/problem/${id}`, {
      cache: "force-cache",
    });
    console.log(response);
    if (response.status === 404) redirect("/404");
    const problem: IProblem = await response.json();
    if (!problem) redirect("/404");
    return problem;
  },
};
