import { Card } from "@/components/ui/cards/Card";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import { twMerge } from "tailwind-merge";
import { FaCode } from "react-icons/fa6";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { FaUsers } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

export default function HomePage() {
  const classrooms = [
    {
      name: "Turma de programação 2024.2",
      teacher: "Silva",
      students: 30,
    },
    {
      name: "Turma de matemática 2024.1",
      teacher: "Souza",
      students: 25,
    },
    {
      name: "Turma de física 2024.3",
      teacher: "Oliveira",
      students: 20,
    },
  ];
  return (
    <div className="flex flex-col w-full gap-4">
      <div
        className={twMerge(
          "flex flex-col w-full gap-4 py-8 px-16",
          "text-white",
          "bg-linear-to-r from-blue-500 to-blue-800"
        )}
      >
        <h1 className="text-4xl font-bold animate-pulse">
          Bem vindo, Fulano! 🎉
        </h1>
        Acesse{" "}
        <TypeWriterText text="suas turmas e resolva problemas de programação!" />
      </div>
      <div className="flex flex-col w-full gap-4 px-16 py-4">
        <div className="grid grid-cols-3 gap-4">
          {/* {classrooms.map((classInfo, index) => (
            <Card.Root
              key={index}
              asChild
              className={twMerge(
                "p-4 shadow-md border-none",
                "bg-linear-to-r from-blue-500 to-blue-700",
                // "bg-linear-to-r from-blue-500 to-blue-700",
                "duration-300 ease-in-out"
              )}
            >
              <ProgressLink href="/classroom">
                <div className="flex gap-1 group">
                  <div className="flex flex-col">
                    <h4 className="text-xl font-bold text-white mb-4 line-clamp-1">
                      {classInfo.name}
                    </h4>
                    <p className="text-sm text-white line-clamp-1">
                      Professor: {classInfo.teacher}
                    </p>
                    <p className="text-sm text-white line-clamp-1">
                      Alunos: {classInfo.students}
                    </p>
                    <Button className="mt-4" variantStyle="secondary">
                      Acessar
                    </Button>
                  </div>
                  <FaCode
                    className={twMerge(
                      "my-auto ml-auto text-7xl text-white opacity-80",
                      "rotate-x-45 rotate-z-43 transform-3d",
                      "group-hover:rotate-x-0 group-hover:rotate-z-0",
                      "duration-500 ease-in-out"
                    )}
                  />
                </div>
              </ProgressLink>
            </Card.Root>
          ))} */}
          {classrooms.map((classInfo, index) => (
            <Card.Root key={index} className="p-4">
              <div className="flex gap-1 group">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex justify-center items-center size-8 bg-blue-500 rounded-full">
                      <FaUsers className="text-white" />
                    </span>
                    <h4 className="ine-clamp-1">{classInfo.name}</h4>
                  </div>
                  <p className="text-sm line-clamp-1 text-muted-foreground">
                    Professor: {classInfo.teacher}
                  </p>
                  <p className="text-sm line-clamp-1 text-muted-foreground">
                    Alunos: {classInfo.students}
                  </p>
                  <Button
                    rightIcon={<FaArrowRight />}
                    asChild
                    className="mt-4"
                    variantStyle="info"
                  >
                    <ProgressLink href={`/classroom/dsadsad/lists`}>
                      Acessar
                    </ProgressLink>
                  </Button>
                </div>
              </div>
            </Card.Root>
          ))}
        </div>
      </div>
    </div>
  );
}
