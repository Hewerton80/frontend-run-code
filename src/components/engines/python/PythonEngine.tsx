import { useEffect, useState } from "react";
import { pythonExecutionEngine } from "./pythonExecutionEngine";

export const PythonEngine = () => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    pythonExecutionEngine({
      // code: `
      //      while True:
      //          print("Hello, World!")
      //   `,
      code: `
            A = int(input())
            B = int(input())
            X = A + B
            print("X =", X)
        `,
      // input: "",
      input: "1\n",
      //   expectedOutput: "2",
    })
      .then((result) => {
        console.log({ result });
        setOutput(result.output || "");
      })
      .catch((error) => {
        console.error("Error running Python code:", error);
        setError(JSON.stringify(error));
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return <div>{output}</div>;
};
