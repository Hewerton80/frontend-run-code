"use client";

import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { ButtonGroup } from "@/components/ui/dataDisplay/ButtonGroup";
import { DataTable } from "@/components/ui/dataDisplay/DataTable";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { IDE } from "@/modules/submission/components/IDE";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export default function ProblemPage() {
  const [editorValue, setEditorValue] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const exampleColumns = [
    {
      field: "inputsExample",
      label: "Inputs Example",
      onParse: (inputs: any) => (
        <div className="flex flex-wrap gap-2">
          {inputs?.inputsExample.map((input: number, index: number) => (
            <Badge variant="info" key={index}>
              {input}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      field: "outputExample",
      label: "Output Example",
      onParse: (output: any) => <div>{output?.outputExample}</div>,
    },
  ];

  const exampleDataRows = [
    {
      id: 1,
      inputsExample: [4, 2, 7, 11, 15, 9],
      outputExample: "[0,1]",
    },
    {
      id: 2,
      inputsExample: [3, 3, 2, 4, 6],
      outputExample: "[1,2]",
    },
    {
      id: 3,
      inputsExample: [3, 3, 3, 4, 6],
      outputExample: "[0,1]",
    },
  ];

  const responseColumns = [
    {
      field: "inputs",
      label: "Test Inputs",
      onParse: (response: any) => (
        <div className="flex flex-wrap gap-2">
          {response?.inputs.map((input: number, index: number) => (
            <Badge variant="info" key={index}>
              {input}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      field: "expectedOutputs",
      label: "Expected Output",
      // onParse: (response: any) => <div>{response?.outputExample}</div>,
    },
    {
      field: "outputs",
      label: "Output",
      // onParse: (response: any) => <div>{response?.outputExample}</div>,
    },
    // {
    //   field: "status",
    //   label: "Status",
    //   onParse: (response: any) => (
    //     <Badge variant={response?.status === "error" ? "danger" : "success"}>
    //       {response?.status}
    //     </Badge>
    //   ),
    // },
  ];

  const responseRows = [
    [
      {
        inputs: exampleDataRows[0].inputsExample,
        expectedOutputs: exampleDataRows[0].outputExample,
        outputs: "[0,1]",
        status: "success",
      },
    ],
    [
      {
        inputs: exampleDataRows[1].inputsExample,
        expectedOutputs: exampleDataRows[1].outputExample,
        outputs: exampleDataRows[0].outputExample,
        status: "error",
      },
    ],
    [
      {
        inputs: exampleDataRows[2].inputsExample,
        expectedOutputs: exampleDataRows[2].outputExample,
        outputs: exampleDataRows[2].outputExample,
        status: "success",
      },
    ],
  ];

  return (
    <div className="flex h-ful w-full gap-4 ">
      <div className="grid grid-cols-12 gap-4 h-full w-full">
        <Card.Root
          className={twMerge(
            "flex flex-col col-span-3 h-full p-4 gap-2 ",
            "border-l-3 border-l-info rounded-l-none"
          )}
        >
          <div className="flex items-center gap-2">
            <FaCode className="text-info" />{" "}
            <h3 className="text-lg">Two Sum</h3>
          </div>
          <div className="text-sm">
            <p>
              Given an interger (array length), array of integers nums and an
              integer target, return indices of the two numbers such that they
              add up to target.
            </p>
            <p>
              You may assume that each input would have exactly one solution,
              and you may not use the same element twice.
            </p>
            <p>You can return the answer in any order.</p>
          </div>
          <DataTable columns={exampleColumns} data={exampleDataRows} />
        </Card.Root>
        <div className="flex flex-col col-span-9 h-full gap-4">
          <Card.Root className="gap-4 col-span-8 h-full p-4">
            <IDE value={editorValue} onChange={setEditorValue} />
            <div className="flex justify-end">
              {/* <ButtonGroup> */}
              <Button variantStyle="info" onClick={() => setShowOutput(true)}>
                Run Code
              </Button>
              {/* <Button variantStyle="success">Submit</Button> */}
              {/* </ButtonGroup> */}
            </div>
          </Card.Root>
          {showOutput && (
            <div className="grid grid-cols-2 gap-4">
              {responseRows.map((responseRow, index) => (
                <div
                  key={`response-${index}`}
                  className="flex flex-col gap-2 col-span-1"
                >
                  <div className="flex items-center gap-2">
                    <p>
                      <span className="text-xs">Case {index + 1}:</span>{" "}
                      {responseRow[0]?.status === "error" ? "😞" : "😀"}&nbsp;
                    </p>
                  </div>
                  <div>
                    <DataTable
                      className={
                        responseRow[0]?.status === "error"
                          ? "border-danger"
                          : "border-success"
                      }
                      key={`response-${index}`}
                      columns={responseColumns}
                      data={responseRow}
                    />
                  </div>
                </div>
              ))}
              {/* <DataTable columns={responseColumns} data={responseRows} /> */}
            </div>
          )}
          {/* /<TerminalCode content="[0,1]" /> */}
        </div>
      </div>
    </div>
  );
}
