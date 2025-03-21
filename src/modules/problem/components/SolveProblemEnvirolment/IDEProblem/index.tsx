"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { IProblem } from "@/modules/problem/problemTypes";
import { IDE } from "@/modules/submission/components/IDE";
import { useState } from "react";

interface IDEProblemProps {
  problem?: IProblem;
}

export const IDEProblem = ({ problem }: IDEProblemProps) => {
  const [editorValue, setEditorValue] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  return (
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
  );
  {
    /* {showOutput && (
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
    </div>
  )} */
  }
};
