// pythonWorker.js
importScripts("https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js");

let pyodide;
let interruptBuffer;

(async () => {
  pyodide = await loadPyodide();
  // cria buffer de interrupção no próprio worker
  interruptBuffer = new Uint8Array(new SharedArrayBuffer(1));
  pyodide.setInterruptBuffer(interruptBuffer);
  self.postMessage({ type: "ready" });
})();

self.onmessage = async (e) => {
  const { cmd, code, input } = e.data;
  console.log({ cmd, code, input });
  if (cmd === "run") {
    // limpa buffer
    interruptBuffer[0] = 0;

    pyodide.setStdin({
      stdin: () => input || "",
    });
    pyodide.setStdout({
      batched: (s) => self.postMessage({ type: "stdout", data: s }),
    });
    pyodide.setStderr({
      batched: (s) => self.postMessage({ type: "stderr", data: s }),
    });

    try {
      const result = await pyodide.runPythonAsync(code);
      self.postMessage({ type: "done", data: result });
    } catch (error) {
      self.postMessage({ type: "error", data: error });
    }
  }

  if (cmd === "interrupt") {
    // 2 = SIGINT
    interruptBuffer[0] = 2;
  }
};
