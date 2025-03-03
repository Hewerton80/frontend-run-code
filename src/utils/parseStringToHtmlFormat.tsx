import { Fragment } from "react";

export const parseStringToHtmlFormat = (text: string) => {
  return text.toString().split("").map((char, index) => {
    if (char === "\n") {
      return <br key={index} />;
    }
    if (char === "\r") {
      return '';
    }
    if (char === " ") {
      return <Fragment key={index}>&nbsp;</Fragment>;
    }
    return char;
  });
};
