import { memo } from "react";

import { cn } from "@/utils/cn";
import { SubmissionStatus } from "../../types/SubmissionStatusEnum";
import { SUBMISSION_META } from "../../types/SubmissionMetaRecord";

interface SubmissionStatusBadgeProps {
  status?: SubmissionStatus | null;
  className?: string;
}

export const SubmissionStatusBadge = memo(
  ({
    status = SubmissionStatus.PENDING,
    className,
  }: SubmissionStatusBadgeProps) => {
    const statusMeta = SUBMISSION_META[status || SubmissionStatus.PENDING];
    const SubIcon = statusMeta.icon;
    const spin = status === SubmissionStatus.RUNNING;

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
          "font-bold ring-1",
          statusMeta.tone,
          className,
        )}
      >
        <SubIcon className={cn("size-4", spin && "animate-spin")} />
        {statusMeta.label}
      </span>
    );
  },
);

SubmissionStatusBadge.displayName = "SubmissionStatusBadge";
