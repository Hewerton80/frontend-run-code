export const parseStringToHtmlFormat = (text: string) => {
  return (text || "")
    .replace(/\n/g, "<br/>")
    .replace(/\r/g, "")
    .replace(/ {2}/g, " &nbsp;");
};
