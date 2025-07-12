"use client";
import { useProgressBar } from "@/hooks/useProgressBar";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import {
  ComponentPropsWithRef,
  ReactNode,
  startTransition,
  useState,
} from "react";

interface ProgressLink {
  className?: string;
  href: string;
  children?: ReactNode;
}

export default function ProgressLink({
  href,
  children,
  ...restProps
}: ProgressLink) {
  const router = useRouter();

  const { startProgress, doneProgress } = useProgressBar();

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        startProgress();

        startTransition(() => {
          doneProgress();
          router.push(href);
        });
      }}
      href={href}
      {...restProps}
    >
      {children}
    </Link>
  );
}
