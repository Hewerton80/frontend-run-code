import { Hello } from "@/components/ui/typography/Hello/Hello";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { twMerge } from "tailwind-merge";

export const HomeHeader = () => {
  const { loggedUser } = useAuth();
  return (
    <div
      className={twMerge(
        "flex flex-col w-full gap-4 p-8",
        "text-white",
        "bg-linear-to-r from-blue-500 to-blue-800"
      )}
    >
      <div className="flex">
        <h1 className="text-4xl font-bold animate-pulse">
          Bem vindo, {loggedUser?.username}!{" "}
        </h1>
        <Hello className="text-4xl " />
      </div>
      Acesse <TypeWriterText text="suas turmas e resolva exercícios!" />
    </div>
  );
};
