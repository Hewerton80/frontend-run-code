"use client";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

const avatarSize = {
  sm: {
    dimensions: "sm:h-8 sm:w-8 min-w-[2rem] sm:min-w-[2rem]",
    text: "text-sm",
  },
  md: {
    dimensions: "h-8 w-8 sm:h-9 sm:w-9 min-w-[2rem] sm:min-w-[2rem]",
    text: "text-base",
  },
  lg: {
    dimensions: "h-8 w-8 sm:h-10 sm:w-10 min-w-[2rem] sm:min-w-[2rem]",
    text: "text-base",
  },
};

export interface AvatarProps extends ComponentProps<typeof RadixAvatar.Root> {
  src?: string;
  alt?: string;
  nameInities?: string;
  bgColor?: string;
  color?: string;
  size?: keyof typeof avatarSize;
}

export function Avatar({
  src,
  alt,
  nameInities = "",
  bgColor = colors.white,
  color = colors.white,
  className,
  size = "lg",
  ...restProps
}: AvatarProps) {
  // const nameInities = useMemo(() => {
  //   if (!username) return "";
  //   const names = username.split(" ");

  //   if (names.length >= 2) {
  //     const firstLetterFirstName = names[0][0];
  //     const firstLetterSecondName = names[1][0];
  //     return `${firstLetterFirstName}${firstLetterSecondName}`;
  //   } else if (names.length === 1) {
  //     const firstLetterSingleName = names[0][0];
  //     return `${firstLetterSingleName}`;
  //   }
  // }, [username]);
  return (
    <RadixAvatar.Root
      className={twMerge(
        "inline-flex items-center justify-center",
        "overflow-hidden rounded-full select-none align-middle",
        avatarSize[size].dimensions,
        className
      )}
      {...restProps}
    >
      {src && (
        <RadixAvatar.Image
          className="h-full w-full object-cover rounded-[inherit]"
          src={src}
          alt={alt}
        />
      )}
      <RadixAvatar.Fallback
        className={twMerge(
          "flex items-center justify-center h-full w-full uppercase",
          avatarSize[size].text
        )}
        style={{ backgroundColor: bgColor, color }}
      >
        {nameInities}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
