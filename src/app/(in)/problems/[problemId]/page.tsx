import { SolveProblemEnvirolment } from "@/modules/problem/components/SolveProblemEnvirolment";
import { ProblemService } from "@/modules/problem/problemService";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  if (isNaN(Number(problemId))) {
    return null;
  }
  console.log({ problemId });
  const problem = await ProblemService.getById(problemId);
  // console.log(problem);

  return <SolveProblemEnvirolment problem={problem} />;
}
