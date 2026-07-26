import { HomeHero } from "@/components/common/HomeHero";

// TODO adicionar refresh token
// TODO mudar todas as tipaggens para que fiquem iguais aos retornos da API
// TODO mudar tudo para usar register ao inves de Controller

export default function HomePage() {
  return (
    <div className="flex flex-col w-full px-4 py-6 md:px-8">
      <HomeHero />
      <div className="flex flex-col gap-4 w-full pt-6"></div>
    </div>
  );
}
