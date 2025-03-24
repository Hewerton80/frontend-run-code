"use client";

import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { IDE } from "@/modules/submission/components/IDE";
import { EnterMultSelect } from "@/components/ui/forms/inputs/EnterMultSelect";
import { SelectOption } from "@/components/ui/forms/selects";
import { useRunCode } from "@/modules/submission/hooks/useRunCode";
import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { useState } from "react";
import { TerminalCode } from "@/components/ui/dataDisplay/TerminalCode";
import { ThreeDotsLoading } from "@/components/ui/feedback/ThreeDotsLoading";
import { RunCodeBody } from "@/modules/submission/schemas/runCodeBodySchema";

export default function PlayGroundPage() {
  const [editorValue, setEditorValue] = useState("");
  const [inputs, setInputs] = useState<SelectOption[]>([]);
  const { languageMode } = useLanguage();

  const { isRunningCode, runCodeError, runCodeResponse, runCode } =
    useRunCode();

  const handleSubmit = () => {
    const formaData: RunCodeBody = {
      sourceCode: editorValue,
      inputValues: inputs.map((input) => input.label),
      language: languageMode,
    };
    console.log(formaData);
    runCode(formaData);
  };

  return (
    <div className="flex flex-col w-full gap-4 px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold">Code Playground 🎮</h1>
      <div className="grid grid-cols-12 gap-4 h-full">
        <Card.Root className="col-span-8 h-full p-4">
          <IDE value={editorValue} onChange={setEditorValue} />
        </Card.Root>
        <Card.Root asChild className="col-span-4 h-full p-4 gap-4">
          <form onSubmit={(e) => e.preventDefault()}>
            <EnterMultSelect
              value={inputs}
              onChange={setInputs}
              label="Custom ipunts:"
              placeholder="Enter inputs"
            />
            <div className="flex justify-end">
              <Button isLoading={isRunningCode} onClick={handleSubmit}>
                Run Code
              </Button>
            </div>
            <div className="flex flex-col h-full gap-4">
              <p>Output:</p>
              {isRunningCode && <ThreeDotsLoading />}
              {runCodeResponse && (
                <TerminalCode content={runCodeResponse?.output || ""} />
              )}
              {runCodeError && (
                <TerminalCode content={runCodeError?.description || ""} />
              )}
            </div>
          </form>
        </Card.Root>
      </div>
    </div>
  );
}
