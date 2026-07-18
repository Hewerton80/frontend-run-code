import { cn } from "@/utils/cn";
import { getHue } from "@/utils/colorHelpers";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { memo, useMemo } from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  // nameInities?: string;
  bgColor?: string;
  size?: number;
  name: string;
  className?: string;
  emoji?: string;
}

export const Avatar = memo(
  ({
    src,
    alt,
    name,
    bgColor = "oklch(0.62 0.22 275)",
    className,
    size = 40,
    emoji,
  }: AvatarProps) => {
    const initials = useMemo(() => {
      const names = name.split(" ");

      if (names.length >= 2) {
        const firstLetterFirstName = names[0][0];
        const firstLetterSecondName = names[1][0];
        return `${firstLetterFirstName}${firstLetterSecondName}`;
      }
      const firstLetterSingleName = names[0][0];
      return `${firstLetterSingleName}`;
    }, [name]);

    const hue = useMemo(() => getHue(bgColor), [bgColor]);

    const bg = `oklch(0.55 0.18 ${hue})`;
    const ring = `oklch(0.7 0.2 ${hue})`;

    return (
      <RadixAvatar.Root
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          "rounded-full select-none align-middle",
          className,
        )}
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${bg}, oklch(0.45 0.2 ${hue + 30}))`,
          boxShadow: `0 0 0 2px ${ring}`,
        }}
      >
        {src && (
          <RadixAvatar.Image
            className="size-full object-cover rounded-full"
            src={src}
            alt={alt}
            width={size}
            height={size}
          />
        )}
        <RadixAvatar.Fallback
          className="flex items-center rounded-full justify-center size-full uppercase text-white font-semibold"
          style={{
            fontSize: size * 0.4,
          }}
        >
          {emoji ?? initials}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  },
);

Avatar.displayName = "Avatar";
