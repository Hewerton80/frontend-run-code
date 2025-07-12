export const parseStringToHtmlFormat = (text: string) => {
  return (text || "")
    .replace(/\n/g, "<br/>")
    .replace(/\r/g, "")
    .replace(/  /g, " &nbsp;");
  // .toString()
  // .split("")
  // .map((char, index) => {
  //   if (char === "\n") {
  //     return <br key={`${char}-${index}`} />;
  //   }
  //   if (char === "\r") {
  //     return "";
  //   }
  //   if (char === " ") {
  //     return <Fragment key={index}>&nbsp;</Fragment>;
  //   }
  //   return char;
  // });
};
