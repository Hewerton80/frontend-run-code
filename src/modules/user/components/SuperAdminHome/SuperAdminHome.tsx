import { SubmissionHistoricBarChart } from "@/modules/insights/components/SubmissionHistoricBarChart";
import { SubmissionsLanguagesPieChart } from "@/modules/insights/components/SubmissionsLanguagesPieChart";

export const SuperAdminHome = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SubmissionsLanguagesPieChart />
      <SubmissionHistoricBarChart />
    </div>
  );
};
