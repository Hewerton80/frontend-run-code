import { Sparkles } from "@/components/illustrations/Sparkles";
import { CodeXmlIcon } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex flex-col">
      {/* Gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 20%, oklch(0.45 0.22 275 / 0.55), transparent 60%), radial-gradient(900px 600px at 85% 80%, oklch(0.5 0.24 320 / 0.5), transparent 60%), radial-gradient(700px 500px at 60% 15%, oklch(0.55 0.2 240 / 0.45), transparent 60%), linear-gradient(135deg, oklch(0.14 0.03 275), oklch(0.12 0.05 300))",
        }}
      />

      {/* Floating blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute z-10 top-[10%] left-[8%] h-64 w-64 rounded-full blur-3xl opacity-60"
        style={{ background: "oklch(0.6 0.22 275 / 0.55)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-10 bottom-[8%] right-[10%] h-80 w-80 rounded-full blur-3xl opacity-60"
        style={{ background: "oklch(0.6 0.2 320 / 0.5)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-10 top-[55%] left-[45%] h-56 w-56 rounded-full blur-3xl opacity-40"
        style={{ background: "oklch(0.65 0.2 200 / 0.45)" }}
      />

      {/* Dotted grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Sparkles */}
      <Sparkles />

      {/* Header logo */}
      <header className="fixed w-full top-0 z-10 flex items-center gap-2 px-6 py-5 md:px-10">
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
          <CodeXmlIcon className="size-5 text-white" />
        </span>
        <span className="text-lg font-extrabold tracking-tight">
          Code Quest Arena
        </span>
      </header>
      <main className="relative z-10 flex items-center justify-center px-4 h-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}
