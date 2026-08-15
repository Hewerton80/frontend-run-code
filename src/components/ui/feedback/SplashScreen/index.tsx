import { PlanetCrystalCore } from "@/components/illustrations/PlanetCrystalCore";
import { RocketFlying } from "@/components/illustrations/RocktFlyng";
import { cn } from "@/utils/cn";
import styles from "./styles.module.css";

const STARS = [
  { x: 8, y: 18, size: 3, delay: 0, o: 0.6 },
  { x: 18, y: 62, size: 2, delay: 0.6, o: 0.45 },
  { x: 28, y: 30, size: 2, delay: 1.2, o: 0.5 },
  { x: 38, y: 82, size: 3, delay: 0.3, o: 0.4 },
  { x: 52, y: 12, size: 2, delay: 1.5, o: 0.55 },
  { x: 64, y: 70, size: 3, delay: 0.9, o: 0.5 },
  { x: 74, y: 26, size: 2, delay: 0.2, o: 0.45 },
  { x: 84, y: 56, size: 3, delay: 1.1, o: 0.6 },
  { x: 92, y: 34, size: 2, delay: 1.8, o: 0.4 },
  { x: 46, y: 46, size: 2, delay: 2.1, o: 0.35 },
  { x: 12, y: 88, size: 2, delay: 1.4, o: 0.4 },
  { x: 68, y: 92, size: 2, delay: 0.7, o: 0.35 },
];
interface SplashScreenProps {
  className?: string;
  visible?: boolean;
}

export const SplashScreen = ({ className, visible }: SplashScreenProps) => {
  return (
    <div
      aria-hidden={!visible}
      role="status"
      className={cn(
        "fixed inset-0 z-1000 grid place-items-center bg-background transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      {/* Deep space backdrop */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(120%_80%_at_50%_20%,color-mix(in_oklab,var(--color-primary)_28%,transparent),transparent_65%)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {STARS.map((s, i) => (
          <span
            key={i}
            className={cn(
              "absolute rounded-full bg-foreground/70",
              styles["animate-star-drift"],
            )}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              opacity: s.o,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6 px-6">
        {/* Orbit illustration */}
        <div className="relative grid h-52 w-52 sm:h-100 sm:w-100 place-items-center">
          <div
            className={cn(
              "absolute inset-0 rounded-full border border-primary/25",
              styles["animate-orbit-spin"],
            )}
          />
          <div
            className={cn(
              "absolute inset-5 rounded-full border border-dashed border-primary/35",
              styles["animate-orbit-spin-reverse"],
            )}
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl" />

          {/* Planet / crystal core */}
          <div className={styles["animate-float-bob"]}>
            <PlanetCrystalCore className="h-24 w-24 sm:w-48 sm:h-48" />
          </div>

          {/* Rocket orbiting the planet */}
          <div className={cn("absolute inset-0", styles["animate-orbit-spin"])}>
            <div
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3",
                styles["animate-orbit-spin-reverse"],
              )}
            >
              <RocketFlying className="scale-75 sm:scale-150" />
            </div>
          </div>
        </div>

        {/* Wordmark + status */}
        <div className="text-center">
          <div className="font-display-rpg text-2xl font-black tracking-[0.2em] text-shimmer">
            Code Quest Arena
          </div>
          <p className="mt-1 text-sm font-semibold text-shimmer">
            Preparando sua jornada...
          </p>
        </div>

        {/* Indeterminate progress */}
        <div className="h-1.5 w-52 overflow-hidden rounded-full bg-foreground/10">
          <div
            className={cn(
              "h-full w-1/3 rounded-full bg-linear-to-r from-transparent via-primary to-transparent",
              styles["animate-progress-indeterminate"],
            )}
          />
        </div>
      </div>
    </div>
  );
};
