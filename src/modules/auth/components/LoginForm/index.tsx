import { Button } from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/forms/inputs/Input";
import { useLoginForm } from "./useLoginForm";
import { PasswordInput } from "@/components/ui/forms/inputs/PasswordInput";
import { Rocket } from "lucide-react";
import { Mascot } from "@/components/illustrations/Mascot";
import { cn } from "@/utils/cn";

export function LoginForm() {
  const { loginFormRegister, login, loginFormState, isLogging } =
    useLoginForm();

  return (
    <div
      className={cn(
        "w-full max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-card/70",
        "shadow-2xl backdrop-blur-xl ring-1 ring-white/5",
        "animate-in fade-in slide-in-from-bottom-[1rem] duration-1000",
      )}
    >
      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* Form side */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Bem-vindo(a) de volta!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Vamos codar e evoluir de nível.
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground/80">
            Entre na sua conta
          </p>

          <form className="mt-7 space-y-5" onSubmit={login}>
            <Input
              {...loginFormRegister("email")}
              id={loginFormRegister("email").name}
              label="Email"
              placeholder="email@example.com"
              error={loginFormState.errors.email?.message}
            />

            <PasswordInput
              {...loginFormRegister("password")}
              id={loginFormRegister("password").name}
              label="Senha"
              placeholder="••••••••"
              error={loginFormState.errors.password?.message}
            />

            <Button
              isLoading={isLogging}
              type="submit"
              variantStyle="primary"
              fullWidth
              // asChild
            >
              <span className="inline-flex size-full items-center justify-center gap-2 group">
                <Rocket className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                Login
              </span>
            </Button>

            {/* <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 active:scale-[0.99]"
              >
                <Rocket className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                Entrar
              </button> */}

            {/* <div className="pt-1 text-center">
                <a
                  href="#"
                  className="text-sm font-medium text-info hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <a href="#" className="font-semibold text-info hover:underline">
                  Cadastre-se
                </a>
              </p> */}
          </form>
        </div>

        {/* Mascot side */}
        <div className="relative hidden overflow-hidden bg-linear-to-br from-[oklch(0.22_0.05_275)] to-[oklch(0.18_0.06_300)] md:block">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(oklch(1 0 0 / 0.35) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <Mascot />
          <div className="absolute inset-x-0 bottom-0 p-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              Pronto pra próxima quest?
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Suba de nível resolvendo desafios de código.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
