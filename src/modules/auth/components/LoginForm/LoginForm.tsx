"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/forms/inputs/Input";
import Image from "next/image";

export function LoginForm() {
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
          // style={{ zIndex: -1 }}
        >
          <source src="/videos/0410.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex items-center justify-center size-full px-8">
        <div className="flex flex-col w-full max-w-xs">
          <h1 className="text-center text-2xl font-bold mb-6">
            Entre na sua conta
          </h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input label="Email" placeholder="email@example.com" />
            <Input label="Senha" type="password" placeholder="********" />
            <Button variantStyle="info" fullWidth>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
