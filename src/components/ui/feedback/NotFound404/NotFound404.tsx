import { Button } from "@/components/ui/buttons/Button";
import { Link } from "react-router-dom";

export const NotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! Página não encontrada.</p>
        <Button variantStyle="primary" asChild>
          <Link to="/home" replace>
            Voltar para o início
          </Link>
        </Button>
      </div>
    </div>
  );
};
