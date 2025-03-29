import { SolveProblemEnvirolment } from "@/modules/problem/components/SolveProblemEnvirolment";
import { ProblemService } from "@/modules/problem/problemService";

interface ProblemPageProps {
  classroomId: string;
  listId: string;
  problemId: string;
}
export default async function ProblemPage({
  params,
}: {
  params: Promise<ProblemPageProps>;
}) {
  const { problemId, classroomId, listId } = await params;
  const problem = await ProblemService.getFromlistById({
    problemId,
    classroomId,
    listId,
  });
  return <SolveProblemEnvirolment problem={problem} />;
}
