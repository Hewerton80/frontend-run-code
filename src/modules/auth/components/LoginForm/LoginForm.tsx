import { Button } from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/forms/inputs/Input";
import { useLoginForm } from "./useLoginForm";

export function LoginForm() {
  const { loginFormRegister, login, loginFormState, isLogging } =
    useLoginForm();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="relative items-center justify-center size-full hidden bg-muted lg:flex px-4">
        {/* <Image src="/images/logo-2.svg" width={560} height={560} alt="logo" /> */}
        <video
          autoPlay
          controls={false}
          loop
          muted
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="/videos/0411.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex items-center justify-center size-full px-8">
        <div className="flex flex-col w-full max-w-xs">
          <h1 className="text-center text-2xl font-bold mb-6">
            Entre na sua conta
          </h1>
          <form className="flex flex-col gap-6" onSubmit={login}>
            <Input
              {...loginFormRegister("email")}
              id={loginFormRegister("email").name}
              label="Email"
              placeholder="email@example.com"
              error={loginFormState.errors.email?.message}
            />
            <Input
              {...loginFormRegister("password")}
              id={loginFormRegister("password").name}
              label="Senha"
              type="password"
              placeholder="********"
              error={loginFormState.errors.password?.message}
            />
            <Button
              isLoading={isLogging}
              type="submit"
              variantStyle="info"
              fullWidth
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
    // <h1>olá, mundo</h1>
  );
}
