import { SolveProblemEnvirolment } from "@/modules/problem/components/SolveProblemEnvirolment";
import { ProblemService } from "@/modules/problem/problemService";
import { isNumberable } from "@/utils/isType";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  // console.log({ problemId });
  // if (!isNumberable(problemId)) {
  //   return null;
  // }
  const problem = await ProblemService.getById(problemId);
  // console.log(problem);

  return <SolveProblemEnvirolment problem={problem} />;
}
