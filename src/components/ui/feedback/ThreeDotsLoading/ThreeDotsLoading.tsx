import style from "./ThreeDotsLoading.module.css";

interface ThreeDotsLoadingProps {
  size?: number;
}

export function ThreeDotsLoading({ size = 12 }: ThreeDotsLoadingProps) {
  const dot = (
    <span className={style.dot} style={{ height: size, width: size }} />
  );

  return (
    <div className={style.root}>
      {dot} {dot} {dot}
    </div>
  );
}
