import { useTypeWriterText } from "@/hooks/useTypeWriterText";

interface TypeWriterTextProps {
  text: string;
}

export function TypeWriterText({ text }: TypeWriterTextProps) {
  const { typeWriterText } = useTypeWriterText({ text });

  return typeWriterText;
}
