import { SolveProblemEnvirolment } from "@/modules/problem/components/SolveProblemEnvirolment";
import { ProblemService } from "@/modules/problem/problemService";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  const problem = await ProblemService.getById(problemId);
  return <SolveProblemEnvirolment problem={problem} />;
}
