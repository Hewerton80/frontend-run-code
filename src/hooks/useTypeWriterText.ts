import { useEffect, useState } from "react";

interface UseTypeWriterTextProps {
  text: string;
  animation?: boolean;
}

export const useTypeWriterText = ({
  text,
  animation = true,
}: UseTypeWriterTextProps) => {
  const [typeWriterText, setTypeWriterText] = useState("");

  useEffect(() => {
    if (!animation) {
      setTypeWriterText(text);
      return;
    }

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const nextChar = text[currentIndex];
      if (!text[currentIndex]) {
        clearInterval(intervalId);
        return;
      }
      setTypeWriterText((prevText) => prevText + nextChar);
      currentIndex++;
    }, 15); // Ajuste o intervalo conforme necessário para a velocidade desejada

    return () => clearInterval(intervalId);
  }, [text, animation]);

  return { typeWriterText };
};
