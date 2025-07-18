import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/buttons/Button";
import { IoReload } from "react-icons/io5";

interface FeedBackErrorProps {
  onTryAgain?: () => void;
}

export function FeedBackError({ onTryAgain }: FeedBackErrorProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-end justify-center w-full space-y-2"
      )}
    >
      <img
        className="mx-auto w-40 h-40 sm:w-48 sm:h-48"
        src="/images/feedback-error.svg"
        alt="error"
        width={240}
        height={240}
      />
      <Button
        className="mx-auto px-2! py-1! text-xs!"
        rightIcon={<IoReload />}
        onClick={onTryAgain}
      >
        Tentar novamente
      </Button>
    </div>
  );
}
