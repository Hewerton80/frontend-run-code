import type { ReactNode } from "react";
import { Button } from "../../buttons/Button";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Isometric illustrations                                             */
/* Simple 3D/low-poly SVGs using the product palette                   */
/* ------------------------------------------------------------------ */

type IllProps = { size?: number; className?: string };

const PRIMARY = "#2b7fff";
const PRIMARY_DARK = "#1e5fd6";
const PRIMARY_LIGHT = "#6aa7ff";
const ACCENT = "#8b5cf6";
const GLOW = "#3b8bff";

export function PortalIllustration({ size = 220, className }: IllProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Portal fechado"
    >
      <defs>
        <linearGradient id="portalRing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
        <radialGradient id="portalCore" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.9" />
          <stop offset="1" stopColor={PRIMARY_DARK} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* ground */}
      <ellipse
        cx="110"
        cy="184"
        rx="86"
        ry="14"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* base slab (iso) */}
      <polygon points="40,168 110,196 180,168 110,140" fill="#152447" />
      <polygon points="40,168 110,196 110,182 40,154" fill="#0f1c39" />
      <polygon points="180,168 110,196 110,182 180,154" fill="#1a2b52" />
      {/* portal frame */}
      <path
        d="M60 168 C60 108, 160 108, 160 168 Z"
        fill="url(#portalRing)"
        stroke={PRIMARY_LIGHT}
        strokeWidth="2"
      />
      <path d="M74 168 C74 120, 146 120, 146 168 Z" fill="url(#portalCore)" />
      {/* stars */}
      <circle cx="95" cy="140" r="1.6" fill="#e7f0ff" />
      <circle cx="122" cy="130" r="1.2" fill="#e7f0ff" opacity="0.7" />
      <circle cx="110" cy="152" r="1.8" fill="#e7f0ff" />
      <circle cx="138" cy="150" r="1" fill="#e7f0ff" opacity="0.6" />
      {/* lock */}
      <rect x="102" y="152" width="16" height="14" rx="2" fill={PRIMARY} />
      <path
        d="M104 152 v-4 a6 6 0 0 1 12 0 v4"
        fill="none"
        stroke={PRIMARY}
        strokeWidth="2"
      />
      {/* floating particles */}
      <circle cx="34" cy="80" r="3" fill={PRIMARY_LIGHT} opacity="0.6">
        <animate
          attributeName="cy"
          values="80;70;80"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="196" cy="60" r="2" fill={ACCENT} opacity="0.7">
        <animate
          attributeName="cy"
          values="60;72;60"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="185" cy="110" r="2.5" fill={PRIMARY} opacity="0.5">
        <animate
          attributeName="cy"
          values="110;100;110"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export function ScrollIllustration({ size = 200, className }: IllProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Pergaminho vazio"
    >
      <defs>
        <linearGradient id="scrollTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ecff" />
          <stop offset="1" stopColor="#b8c7f0" />
        </linearGradient>
      </defs>
      <ellipse
        cx="110"
        cy="188"
        rx="80"
        ry="12"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* scroll body (iso) */}
      <polygon points="45,80 110,58 175,80 110,102" fill="#c5d1ee" />
      <polygon points="45,80 110,102 110,166 45,144" fill="#8fa2d3" />
      <polygon points="175,80 110,102 110,166 175,144" fill="url(#scrollTop)" />
      {/* rolled ends */}
      <ellipse cx="45" cy="80" rx="10" ry="16" fill={PRIMARY_DARK} />
      <ellipse cx="175" cy="80" rx="10" ry="16" fill={PRIMARY} />
      <ellipse cx="45" cy="144" rx="10" ry="16" fill={PRIMARY_DARK} />
      <ellipse cx="175" cy="144" rx="10" ry="16" fill={PRIMARY} />
      {/* faded lines */}
      <g stroke="#7286b8" strokeWidth="2" opacity="0.5" strokeLinecap="round">
        <line x1="70" y1="110" x2="150" y2="98" />
        <line x1="72" y1="122" x2="150" y2="110" />
        <line x1="74" y1="134" x2="130" y2="124" />
      </g>
      {/* sparkles */}
      <circle cx="40" cy="46" r="2" fill={PRIMARY_LIGHT} />
      <circle cx="180" cy="40" r="2.5" fill={ACCENT} opacity="0.8" />
      <circle cx="200" cy="120" r="2" fill={PRIMARY} opacity="0.6" />
    </svg>
  );
}

export function ChestIllustration({ size = 160, className }: IllProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Baú de tesouro vazio"
    >
      <ellipse
        cx="110"
        cy="188"
        rx="72"
        ry="10"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* base */}
      <polygon points="50,140 110,164 170,140 110,116" fill="#3054a8" />
      <polygon points="50,140 110,164 110,182 50,158" fill="#1e3a7d" />
      <polygon points="170,140 110,164 110,182 170,158" fill="#3d67c9" />
      {/* open lid tilted back */}
      <polygon points="50,116 110,90 170,116 110,140" fill={PRIMARY} />
      <polygon
        points="50,116 110,140 110,120 50,96"
        fill={PRIMARY_DARK}
        opacity="0"
      />
      {/* lid raised */}
      <polygon points="50,100 110,74 170,100 110,124" fill={PRIMARY_LIGHT} />
      <polygon points="50,100 110,124 110,140 50,116" fill={PRIMARY} />
      <polygon points="170,100 110,124 110,140 170,116" fill={PRIMARY_DARK} />
      {/* interior (empty & dark) */}
      <polygon points="70,132 110,148 150,132 110,116" fill="#0b1424" />
      {/* metal band */}
      <path
        d="M60 148 L110 172 L160 148"
        fill="none"
        stroke="#e6ecff"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* sparkles */}
      <g fill={PRIMARY_LIGHT} opacity="0.8">
        <circle cx="82" cy="60" r="1.6" />
        <circle cx="140" cy="52" r="2" />
        <circle cx="160" cy="76" r="1.4" />
      </g>
    </svg>
  );
}

export function SearchIllustration({ size = 200, className }: IllProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Nenhum resultado encontrado"
    >
      <defs>
        <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={PRIMARY_LIGHT} stopOpacity="0.35" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <ellipse
        cx="110"
        cy="192"
        rx="80"
        ry="10"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* handle */}
      <rect
        x="140"
        y="130"
        width="18"
        height="70"
        rx="9"
        transform="rotate(-40 149 165)"
        fill={PRIMARY_DARK}
      />
      {/* magnifier ring */}
      <circle
        cx="100"
        cy="100"
        r="54"
        fill="url(#lens)"
        stroke={PRIMARY}
        strokeWidth="8"
      />
      {/* question mark inside */}
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fontSize="60"
        fontWeight="900"
        fill={PRIMARY_LIGHT}
        fontFamily="Inter, system-ui, sans-serif"
      >
        ?
      </text>
      {/* dots */}
      <circle cx="30" cy="70" r="2.5" fill={PRIMARY} opacity="0.5" />
      <circle cx="200" cy="50" r="2" fill={ACCENT} opacity="0.7" />
      <circle cx="196" cy="140" r="2" fill={PRIMARY_LIGHT} opacity="0.5" />
    </svg>
  );
}

export function DisconnectedJoystickIllustration({
  size = 200,
  className,
}: IllProps) {
  return (
    <svg
      viewBox="0 0 240 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Controle desconectado"
    >
      <defs>
        <linearGradient id="pad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>
      <ellipse
        cx="120"
        cy="188"
        rx="86"
        ry="10"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* controller body iso */}
      <path
        d="M60 120 Q60 90 90 90 L150 90 Q180 90 180 120 L172 156 Q168 172 150 172 L90 172 Q72 172 68 156 Z"
        fill="url(#pad)"
        stroke={PRIMARY_DARK}
        strokeWidth="2"
      />
      {/* d-pad */}
      <rect x="82" y="118" width="26" height="8" rx="2" fill="#0b1424" />
      <rect x="91" y="109" width="8" height="26" rx="2" fill="#0b1424" />
      {/* buttons */}
      <circle cx="150" cy="115" r="5" fill={ACCENT} />
      <circle cx="162" cy="127" r="5" fill="#22c55e" />
      <circle cx="138" cy="127" r="5" fill="#f59e0b" />
      <circle cx="150" cy="139" r="5" fill="#ef4444" />
      {/* cable cut */}
      <path
        d="M120 90 C120 60, 90 60, 88 40"
        stroke={PRIMARY}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M150 34 C160 40, 170 50, 172 66"
        stroke={PRIMARY_DARK}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* spark */}
      <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <line x1="118" y1="30" x2="128" y2="24" />
        <line x1="122" y1="38" x2="134" y2="38" />
        <line x1="118" y1="46" x2="128" y2="52" />
      </g>
    </svg>
  );
}

export function BrokenJoystickIllustration({
  size = 220,
  className,
}: IllProps) {
  return (
    <svg
      viewBox="0 0 260 220"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Controle quebrado"
    >
      <defs>
        <linearGradient id="brokenPad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>
      <ellipse
        cx="130"
        cy="196"
        rx="100"
        ry="10"
        fill="#0b1830"
        opacity="0.55"
      />
      {/* left half tilted */}
      <g transform="translate(-14 6) rotate(-8 90 130)">
        <path
          d="M50 120 Q50 90 80 90 L128 90 L128 172 L80 172 Q62 172 58 156 Z"
          fill="url(#brokenPad)"
          stroke={PRIMARY_DARK}
          strokeWidth="2"
        />
        <rect x="74" y="118" width="26" height="8" rx="2" fill="#0b1424" />
        <rect x="83" y="109" width="8" height="26" rx="2" fill="#0b1424" />
      </g>
      {/* right half tilted */}
      <g transform="translate(14 6) rotate(10 170 130)">
        <path
          d="M132 90 L182 90 Q212 90 212 120 L204 156 Q200 172 182 172 L132 172 Z"
          fill="url(#brokenPad)"
          stroke={PRIMARY_DARK}
          strokeWidth="2"
        />
        <circle cx="180" cy="115" r="5" fill={ACCENT} />
        <circle cx="192" cy="127" r="5" fill="#22c55e" />
        <circle cx="168" cy="127" r="5" fill="#f59e0b" />
        <circle cx="180" cy="139" r="5" fill="#ef4444" />
      </g>
      {/* crack sparks */}
      <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <line x1="128" y1="60" x2="136" y2="48" />
        <line x1="130" y1="76" x2="122" y2="66" />
        <line x1="140" y1="72" x2="150" y2="60" />
      </g>
      {/* stray screw */}
      <circle cx="60" cy="60" r="4" fill={PRIMARY_LIGHT} />
      <circle cx="220" cy="46" r="3" fill={ACCENT} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable EmptyState wrapper                                         */
/* ------------------------------------------------------------------ */

type Size = "sm" | "md" | "lg";

export function EmptyState({
  illustration,
  title,
  message,
  action,
  secondary,
  size = "md",
  className = "",
}: {
  illustration: ReactNode;
  title: string;
  message: ReactNode;
  action?: ReactNode;
  secondary?: ReactNode;
  size?: Size;
  className?: string;
}) {
  const pad =
    size === "sm" ? "p-6" : size === "lg" ? "px-8 py-20" : "px-6 py-14";
  const titleCls =
    size === "sm"
      ? "text-base font-bold"
      : size === "lg"
        ? "text-2xl font-black"
        : "text-lg font-extrabold";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed",
        "border-border bg-card/40 text-center",
        pad,
        className,
      )}
    >
      {illustration}
      <h3 className={`tracking-tight text-foreground ${titleCls}`}>{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {(action || secondary) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {action}
          {secondary}
        </div>
      )}
    </div>
  );
}

export function EmptyPrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
    >
      {children}
    </button>
  );
}

export function EmptySecondaryLink({
  children,
  onClick,
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground transition hover:bg-accent";
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* Additional variant: reusable "API error" small block */

export function ApiErrorState({
  onRetry,
  title = "Ops, algo saiu da rota",
  message = "Não conseguimos carregar essa parte agora. Tente novamente em instantes.",
  size = "sm",
}: {
  onRetry?: () => void;
  title?: string;
  message?: string;
  size?: Size;
}) {
  return (
    <EmptyState
      size={size}
      illustration={
        <DisconnectedJoystickIllustration size={size === "sm" ? 140 : 200} />
      }
      title={title}
      message={message}
      action={onRetry && <Button onClick={onRetry}>Tentar novamente</Button>}
    />
  );
}
