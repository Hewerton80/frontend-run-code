export function Sparkles() {
  const stars = Array.from({ length: 40 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {stars.map((_, i) => {
        const top = (i * 53) % 100;
        const left = (i * 37) % 100;
        const size = (i % 3) + 1;
        const delay = (i % 7) * 0.4;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/80 animate-pulse"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.35 + (i % 5) / 10,
              animationDelay: `${delay}s`,
              animationDuration: `${2 + (i % 4)}s`,
            }}
          />
        );
      })}
    </div>
  );
}
