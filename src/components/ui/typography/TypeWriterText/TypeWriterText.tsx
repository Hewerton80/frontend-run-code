"use client";

import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { useEffect, useState } from "react";

interface TypeWriterTextProps {
  text: string;
  parseTextToHtmlFormat?: boolean;
}

export function TypeWriterText({
  text,
  parseTextToHtmlFormat,
}: TypeWriterTextProps) {
  const [typeWriterText, setTypeWriterText] = useState("");

  const handledText = text.replace(/\n+$/, "").replace("\r", "");

  const pasedText = parseTextToHtmlFormat
    ? parseStringToHtmlFormat(typeWriterText)
    : typeWriterText;

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const nextLetter = handledText[currentIndex];
      if (!handledText[currentIndex]) {
        clearInterval(intervalId);
        return;
      }
      setTypeWriterText((prevText) => prevText + nextLetter);
      currentIndex++;
    }, 50); // Ajuste o intervalo conforme necessário para a velocidade desejada

    return () => clearInterval(intervalId);
  }, [handledText]);

  return <>{pasedText}</>;
}
