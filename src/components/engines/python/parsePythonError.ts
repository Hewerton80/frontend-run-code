export const parsePyErrror = (error: string) => {
  const resultArray: string[] = [];
  const lines = error?.split("\n") || [];
  const fileLineIndex = lines.findLastIndex((line) => line.includes("File "));
  if (fileLineIndex !== -1) {
    const slicedLine = lines.slice(fileLineIndex + 1);
    console.log({
      lines,
      fileLineIndex,
      slicedLine,
    });
    return slicedLine?.join("\n") || error;
  }
  return error;
  //   console.log({ lines });
  //   for (let i = lines.length + 1; i >= 0; i--) {
  //     const line = lines[i];
  //     if (line.includes("File ")) {
  //       break;
  //     }
  //     resultArray.push(line);
  //   }
  //   return resultArray.join("\n");
};
