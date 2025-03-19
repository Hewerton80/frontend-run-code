import { Button } from "@/components/ui/buttons/Button";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center w-full items-center text-center gap-6 px-6">
      <h1 className="text-4xl font-bold animate-pulse">Bem vindo! 🎉</h1>
      <p className="text-lg">
        Explore o nosso playground de código 🛝💻 e execute seus scripts em tempo real! 🚀✨
      </p>

      <Button variantStyle="info" asChild>
        <Link href="/playground">Ir para o Playground</Link>
      </Button>
    </div>
  );
}
