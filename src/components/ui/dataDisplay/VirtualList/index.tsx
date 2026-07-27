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
  /** Dados a serem renderizados */
  data: T[];
  /** Função que renderiza cada item */
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  /** Extrai a chave única de cada item */
  keyExtractor: (item: T, index: number) => string | number;
  /** Altura estimada de cada item (padrão: 50) */
  estimatedItemSize?: number;
  /** Altura do container do scroll */
  listHeight?: number | string;
  /** Largura do container */
  listWidth?: number | string;
  /** Chamado quando o usuário chega próximo ao final da lista */
  onEndReached?: () => void;
  /** Distância do final para disparar onEndReached (padrão: 200) */
  onEndReachedThreshold?: number;
  /** Componente exibido no topo da lista (similar a ListHeaderComponent) */
  ListHeaderComponent?: React.ReactNode;
  /** Componente exibido no final da lista (similar a ListFooterComponent) */
  ListFooterComponent?: React.ReactNode;
  /** Componente exibido quando a lista está vazia */
  ListEmptyComponent?: React.ReactNode;
  /** Componente exibido durante o carregamento de mais itens */
  ListLoadingComponent?: React.ReactNode;
  /** Se está carregando mais dados */
  loading?: boolean;
  /** Classe CSS adicional para o container */
  className?: string;
  /** Classe CSS adicional para cada item */
  itemClassName?: string;
  /** Estilo inline para o container */
  style?: React.CSSProperties;
  /** Estilo inline para cada item */
  itemStyle?: React.CSSProperties;
  /** Scroll automático para o topo quando data mudar */
  scrollToTopOnDataChange?: boolean;
  /** Acesso ao ref do container de scroll */
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export interface InfiniteListRef {
  /** Scroll para um índice específico */
  scrollToIndex: (
    index: number,
    options?: { align?: "start" | "center" | "end" },
  ) => void;
  /** Scroll para o topo */
  scrollToTop: () => void;
  /** Scroll para o final */
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

      // Reseta o gatilho se o usuário scrollar para cima
      if (distanceToEnd > onEndReachedThreshold * 2) {
        hasTriggeredEndReached.current = false;
      }
    };

    scrollElement.addEventListener("scroll", handleScroll);
    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [onEndReached, onEndReachedThreshold, data.length, loading]);

  // ─── Reset do gatilho quando loading termina ──────────────────────────

  useEffect(() => {
    if (!loading) {
      hasTriggeredEndReached.current = false;
    }
  }, [loading]);

  // ─── Scroll para o topo quando data mudar ─────────────────────────────

  useEffect(() => {
    if (scrollToTopOnDataChange && data.length > 0) {
      virtualizer.scrollToIndex(0, { align: "start" });
    }
  }, [data, scrollToTopOnDataChange, virtualizer]);

  // ─── API Exposta via Ref ──────────────────────────────────────────────

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
      {/* Header */}
      {ListHeaderComponent && (
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          {ListHeaderComponent}
        </div>
      )}

      {/* Container virtualizado */}
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

      {/* Footer / Loading */}
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
