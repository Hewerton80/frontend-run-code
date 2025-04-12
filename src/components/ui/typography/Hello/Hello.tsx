import { twMerge } from "tailwind-merge";
import style from "./Hello.module.css";
interface HelloProps {
  className?: string;
}

export function Hello({ className }: HelloProps) {
  return <span className={twMerge(style.root, className)}>👋</span>;
}
