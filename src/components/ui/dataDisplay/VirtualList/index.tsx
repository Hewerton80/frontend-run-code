import { useRef, useEffect, ReactNode } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IVirtualListRenderItemInfo<TItem> {
  item: TItem;
  index: number;
}

export interface IVirtualListProps<TItem extends { id: string }> {
  /**
   * The data array to render — mirrors FlatList's data prop.
   */
  data: TItem[];

  /**
   * Renders each row — mirrors FlatList's renderItem.
   *
   * @example
   * renderItem={({ item }) => <CouponRow id={item.id} />}
   */
  renderItem: (info: IVirtualListRenderItemInfo<TItem>) => ReactNode;

  /**
   * Estimated height per row in px.
   * Doesn't need to be exact — the virtualizer measures after render.
   * @default 60
   */
  estimatedItemSize?: number;

  /**
   * Fixed height of the scroll container in px.
   * @default 500
   */
  height?: number;

  /**
   * Number of items to render outside the visible area (buffer).
   * @default 5
   */
  overscan?: number;

  /**
   * Optional key extractor. Defaults to item.id.
   */
  keyExtractor?: (item: TItem, index: number) => string;

  /**
   * Called when the user scrolls near the end of the list.
   * Use this to fetch the next page.
   */
  onEndReached?: () => void;

  /**
   * How many items from the end triggers onEndReached.
   * @default 3
   */
  onEndReachedThreshold?: number;

  /**
   * Shown at the bottom when loading more items.
   */
  ListFooterComponent?: ReactNode;

  /**
   * Shown when data is empty.
   */
  ListEmptyComponent?: ReactNode;

  className?: string;
}

// ---------------------------------------------------------------------------
// VirtualList
// ---------------------------------------------------------------------------

export function VirtualList<TItem extends { id: string }>({
  data,
  renderItem,
  estimatedItemSize = 60,
  height = 500,
  overscan = 5,
  keyExtractor,
  onEndReached,
  onEndReachedThreshold = 3,
  ListFooterComponent,
  ListEmptyComponent,
  className,
}: IVirtualListProps<TItem>) {
  const parentRef = useRef<HTMLDivElement>(null);
  // TODO verificar isso aqui com claud AI https://claude.ai/chat/15ceff3a-35fb-4118-addc-fa366aa8c26f
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedItemSize,
    overscan,
  });

  // onEndReached — dispara quando está próximo do fim da lista
  useEffect(() => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    if (!virtualItems.length) return;

    const lastItem = virtualItems[virtualItems.length - 1];
    if (
      lastItem.index >= data.length - 1 - onEndReachedThreshold &&
      onEndReached
    ) {
      onEndReached();
    }
  }, [
    rowVirtualizer.getVirtualItems(),
    data.length,
    onEndReached,
    onEndReachedThreshold,
  ]);

  if (!data.length && ListEmptyComponent) {
    return <>{ListEmptyComponent}</>;
  }

  return (
    <div
      ref={parentRef}
      className={className}
      style={{ height, overflowY: "auto", width: "100%" }}
    >
      {/* container com a altura total virtual */}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];

          return (
            <div
              key={
                keyExtractor ? keyExtractor(item, virtualRow.index) : item.id
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {renderItem({ item, index: virtualRow.index })}
            </div>
          );
        })}
      </div>

      {ListFooterComponent}
    </div>
  );
}
