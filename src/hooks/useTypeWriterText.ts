import { parseStringToHtmlFormat } from "@/utils/parseStringToHtmlFormat";
import { useEffect, useState } from "react";

interface UseTypeWriterTextProps {
  text: string;
  parseTextToHtmlFormat?: boolean;
}

export const useTypeWriterText = ({
  text,
  parseTextToHtmlFormat = false,
}: UseTypeWriterTextProps) => {
  const [typeWriterText, setTypeWriterText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const nextChar = text[currentIndex];
      if (!text[currentIndex]) {
        clearInterval(intervalId);
        return;
      }
      setTypeWriterText((prevText) => prevText + nextChar);
      currentIndex++;
    }, 50); // Ajuste o intervalo conforme necessário para a velocidade desejada

    return () => clearInterval(intervalId);
  }, [text]);

  return {
    typeWriterText: parseTextToHtmlFormat
      ? parseStringToHtmlFormat(typeWriterText)
      : typeWriterText,
  };
};
