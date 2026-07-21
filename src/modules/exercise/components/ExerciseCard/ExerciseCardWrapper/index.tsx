import { ROUTES } from "@/routes/routes";
import { cn } from "@/utils/cn";
import {
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

interface ExerciseCardWrapperProps {
  exerciseUuId: string;
  listId: number;
  classroomUuId: string;
  children?: ReactNode;
  done: boolean;
}

export const ExerciseCardWrapper = memo(
  ({
    exerciseUuId,
    listId,
    classroomUuId,
    done,
    children,
  }: ExerciseCardWrapperProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const onMove = useCallback(
      (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
        // if (isMobile || !ref.current) return;
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
      },
      [],
    );

    const onLeave = useCallback(() => {
      setTilt({ x: 0, y: 0 });
    }, []);

    return (
      <Link
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "group relative flex aspect-3/4 flex-col overflow-hidden rounded-2xl p-3",
          "text-white transition-[transform,box-shadow]",
          "duration-200 will-change-transform hover:z-10",
          done ? "card-glow-accepted" : "card-frame-blurple",
        )}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        to={ROUTES.CLASSROOM_LIST_EXERCISE(classroomUuId, listId, exerciseUuId)}
      >
        {children}
      </Link>
    );
  },
);

ExerciseCardWrapper.displayName = "ExerciseCardWrapper";
