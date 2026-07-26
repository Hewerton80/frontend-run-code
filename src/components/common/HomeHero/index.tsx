import { Hello } from "@/components/ui/typography/Hello/Hello";
import { TypeWriterText } from "@/components/ui/typography/TypeWriterText";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { twMerge } from "tailwind-merge";

export const HomeHero = () => {
  const { loggedUser } = useLoggedUser();
  return (
    <>
      {/* <section
      className={twMerge(
        "flex flex-col w-full gap-4 p-8",
        "text-white",
        "bg-linear-to-r from-blue-500 to-blue-800",
      )}
    >
      <div className="flex">
        <h1 className="text-4xl font-bold animate-pulse">
          Bem vindo(a), {loggedUser?.username}!{" "}
        </h1>
        <Hello className="text-4xl " />
      </div>
      Acesse <TypeWriterText text="suas turmas e resolva exercícios!" />
    </section> */}
      <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-hero p-6 md:p-10 shadow-glow">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-black/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            {/* <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <Zap className="h-3.5 w-3.5" /> Nível {u.level} • {u.xp} /{" "}
              {u.xpNext} XP
            </div> */}
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              Bem vindo(a), {loggedUser?.username}!{" "}
              <span className="inline-block animate-bounce">
                {" "}
                <Hello className="text-4xl " />
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/85 md:text-base">
              Acesse suas turmas, resolva exercícios e mantenha seu streak em
              chamas.
            </p>
            {/* <div className="mt-4 max-w-md">
              <XPBar value={u.xp} max={u.xpNext} tone="warning" height={10} />
            </div> */}
          </div>

          {/* <div className="grid grid-cols-3 gap-3 md:gap-4">
              <HeroStat icon={<Flame className="h-5 w-5" />} label="Streak" value={`${u.streak}d`} tone="warning" />
              <HeroStat icon={<Trophy className="h-5 w-5" />} label="Nível" value={String(u.level)} tone="primary" />
              <HeroStat icon={<Award className="h-5 w-5" />} label="Badges" value="14" tone="success" />
            </div> */}
        </div>
      </section>
    </>
  );
};
