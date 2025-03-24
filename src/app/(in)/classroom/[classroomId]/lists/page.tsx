"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { Accordion } from "@/components/ui/dataDisplay/Accordion";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import { FaCode } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function ClassroomPage() {
  const classrooms = [
    {
      title: "Soma de a + b",
      avaliation: "✅",
    },
    {
      title: "Subtração de a - b",
      avaliation: "❌",
    },
    {
      title: "Multiplicação de a * b",
      avaliation: "🕒",
    },
  ];
  return (
    <div className="flex flex-col w-full gap-4 p-8">
      <Breadcrumbs
        items={[
          { label: "🏠 Home", href: "/" },
          { label: "Turma de programação 2024.2" },
          { label: "Listas" },
        ]}
      />
      <div className="flex flex-col">
        <Accordion.Root
          onValueChange={(value) => console.log({ value })}
          collapsible
          type="single"
        >
          <Accordion.Item value="teste">
            <Accordion.Trigger>
              Lista 1 - Operações lógicas básicas
            </Accordion.Trigger>
            <Accordion.Content>
              <div className="grid grid-cols-3 gap-4">
                {classrooms.map((classInfo, index) => (
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
                            {classInfo.title}
                          </h4>
                          <p className="text-base text-white line-clamp-1">
                            Situação: {classInfo.avaliation}
                          </p>
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
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
}
