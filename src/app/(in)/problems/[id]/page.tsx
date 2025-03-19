"use client";

import { Card } from "@/components/ui/cards/Card";
import { DataTable } from "@/components/ui/dataDisplay/DataTable";
import { IDE } from "@/modules/code/components/IDE";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function ProblemPage() {
  const [editorValue, setEditorValue] = useState("");
  return (
    <div className="flex flex-col w-full gap-4 ">
      <div className="grid grid-cols-12 gap-4 h-fit w-full">
        <Card.Root
          className={twMerge(
            "col-span-8 h-full p-4 gap-2 ",
            "border-l-3 border-l-info rounded-l-none"
          )}
        >
          <div className="flex items-center gap-2">
            <FaCode className="text-info" />{" "}
            <h3 className="text-lg">Two Sum</h3>
          </div>
          <div className="text-sm">
            <p>
              Given an interger (array length), array of integers nums and an integer target, return
              indices of the two numbers such that they add up to target.
            </p>
            <p>
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>
            <p>You can return the answer in any order.</p>
          </div>
        </Card.Root>
        <div className="col-span-4 h-full">
          <DataTable
            columns={[
              {
                field: "inputsExample",
                label: "Inputs Example",
              },
              {
                field: "outputExample",
                label: "Output Example",
                onParse: (output) => <div>{output?.outputExample}</div>,
              },
            ]}
            data={[
              {
                id: 1,
                inputsExample: <>4<br/> 2<br/> 7<br/> 11<br/> 15<br/>9</>,
                outputExample: "[0,1]",
              },
              {
                id: 2,
                inputsExample: <>3<br/>3<br/>2<br/>4<br/>6</>,
                outputExample: "[1,2]",
              },
              {
                id: 3,
                inputsExample: <>3<br/>3<br/>/3<br/>4<br/>6</>,
                outputExample: "[0,1]",
              },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 h-full">
        <Card.Root className="col-span-8 h-full p-4">
          <IDE value={editorValue} onChange={setEditorValue} />
        </Card.Root>
      </div>
    </div>
  );
}
