// InfiniteList.tsx
import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// ─── Tipos ───────────────────────────────────────────────────────────────

export interface InfiniteListProps<T> {
  data: T[];
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  estimatedItemSize?: number;
  listHeight?: number | string;
  listWidth?: number | string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  ListLoadingComponent?: React.ReactNode;
  loading?: boolean;
  className?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  scrollToTopOnDataChange?: boolean;
}

export interface InfiniteListRef {
  scrollToIndex: (
    index: number,
    options?: { align?: "start" | "center" | "end" },
  ) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

// ─── Componente ──────────────────────────────────────────────────────────

function InfiniteListInner<T>(
  {
    data,
    renderItem,
    keyExtractor,
    estimatedItemSize = 50,
    listHeight = 400,
    listWidth = "100%",
    onEndReached,
    onEndReachedThreshold = 200,
    ListHeaderComponent,
    ListFooterComponent,
    ListEmptyComponent,
    ListLoadingComponent,
    loading = false,
    className = "",
    itemClassName = "",
    style = {},
    itemStyle = {},
    scrollToTopOnDataChange = false,
  }: InfiniteListProps<T>,
  ref: React.ForwardedRef<InfiniteListRef>,
) {
  // ⚠️ Diretiva obrigatória para evitar conflito com React Compiler
  "use no memo";

  const parentRef = useRef<HTMLDivElement>(null);
  const hasTriggeredEndReached = useRef(false);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemSize,
    getItemKey: (index) => keyExtractor(data[index], index),
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  // ─── Scroll Infinito ─────────────────────────────────────────────────

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement || !onEndReached || data.length === 0) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const distanceToEnd = scrollHeight - scrollTop - clientHeight;

      if (
        distanceToEnd < onEndReachedThreshold &&
        !hasTriggeredEndReached.current &&
        !loading
      ) {
        hasTriggeredEndReached.current = true;
        onEndReached();
      }

      if (distanceToEnd > onEndReachedThreshold * 2) {
        hasTriggeredEndReached.current = false;
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [onEndReached, onEndReachedThreshold, data.length, loading]);

  useEffect(() => {
    if (!loading) {
      hasTriggeredEndReached.current = false;
    }
  }, [loading]);

  useEffect(() => {
    if (scrollToTopOnDataChange && data.length > 0) {
      virtualizer.scrollToIndex(0, { align: "start" });
    }
  }, [data, scrollToTopOnDataChange, virtualizer]);

  // ─── API via Ref ─────────────────────────────────────────────────────

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index, options) =>
      virtualizer.scrollToIndex(index, options),
    scrollToTop: () => virtualizer.scrollToIndex(0, { align: "start" }),
    scrollToBottom: () =>
      virtualizer.scrollToIndex(data.length - 1, { align: "end" }),
  }));

  // ─── Render ─────────────────────────────────────────────────────────

  if (data.length === 0 && ListEmptyComponent) {
    return <>{ListEmptyComponent}</>;
  }

  return (
    <div
      ref={parentRef}
      className={className}
      style={{
        height: listHeight,
        width: listWidth,
        overflow: "auto",
        position: "relative",
        ...style,
      }}
    >
      {ListHeaderComponent && (
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          {ListHeaderComponent}
        </div>
      )}

      <div
        style={{
          height: `${totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const item = data[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              className={itemClassName}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
                ...itemStyle,
              }}
            >
              {renderItem({ item, index: virtualItem.index })}
            </div>
          );
        })}
      </div>

      {loading && ListLoadingComponent && (
        <div style={{ padding: "16px", textAlign: "center" }}>
          {ListLoadingComponent}
        </div>
      )}
      {ListFooterComponent && !loading && (
        <div style={{ padding: "16px", textAlign: "center" }}>
          {ListFooterComponent}
        </div>
      )}
    </div>
  );
}

export const InfiniteList = forwardRef(InfiniteListInner) as <T>(
  props: InfiniteListProps<T> & { ref?: React.ForwardedRef<InfiniteListRef> },
) => ReturnType<typeof InfiniteListInner>;
