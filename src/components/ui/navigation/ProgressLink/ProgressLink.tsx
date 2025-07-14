import { useProgressBar } from "@/hooks/useProgressBar";

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
  return children;
}
