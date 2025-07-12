import { Button } from "@/components/ui/buttons/Button";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! Página não encontrada.</p>
        <Button variantStyle="primary" asChild>
          <ProgressLink href="/home">Voltar para o início</ProgressLink>
        </Button>
      </div>
    </div>
  );
}
