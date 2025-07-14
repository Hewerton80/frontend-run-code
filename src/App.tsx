import { Routers } from "./Routes";
import { ThemeTamplate } from "./components/ui/templates/ThemeTamplate";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/feedback/Toaster";

export function App() {
  return (
    <Providers>
      <ThemeTamplate />
      <Routers />
      <Toaster />
    </Providers>
  );
}
