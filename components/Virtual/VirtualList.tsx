import { createVirtualizer } from "@tanstack/solid-virtual";
import { For, createMemo } from "solid-js";

import type { Accessor, JSX } from "solid-js";

interface VirtualListProps {
  count: Accessor<number>;
  estimateSize?: () => number;
  height?: string;
  overscan?: number;
  renderItemCallback: (index: number, size: number) => JSX.Element;
}

/**
 * A generic virtualized list component backed by `@tanstack/solid-virtual`.
 * Renders only the visible subset of items by calling `renderItemCallback(index, size)` for each visible row.
 * Configure the scroll container height with `height`, row estimate with `estimateSize`, and render buffer with `overscan`.
 */
export function VirtualList(props: VirtualListProps) {
  let parentRef!: HTMLDivElement;

  const rowVirtualizer = createMemo(() =>
    createVirtualizer({
      count: props.count(),
      estimateSize: props.estimateSize || (() => 35),
      getScrollElement: () => parentRef,
      overscan: props.overscan || 5,
    }),
  );

  return (
    <div
      ref={parentRef}
      style={{
        height: props.height || "400px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer().getTotalSize()}px`,
          position: "relative",
          width: "100%",
        }}
      >
        <For each={rowVirtualizer().getVirtualItems()}>
          {(virtualItem) => (
            <div
              style={{
                height: `${virtualItem.size}px`,
                left: 0,
                position: "absolute",
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: "100%",
              }}
            >
              {props.renderItemCallback(virtualItem.index, virtualItem.size)}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default VirtualList;
