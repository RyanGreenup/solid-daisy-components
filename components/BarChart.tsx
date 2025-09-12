import { JSX, For, mergeProps, Show } from "solid-js";
import { 
  Axis, 
  AxisCursor, 
  AxisGrid, 
  AxisLabel, 
  AxisTooltip, 
  Bar, 
  Chart 
} from 'solid-charts';

export interface BarData {
  [key: string]: any;
}

export interface BarConfig {
  dataKey: string;
  class?: string;
  color?: string;
  label?: string;
}

export interface BarChartProps {
  data: BarData[];
  bars: BarConfig[];
  xAxisKey: string;
  width?: string;
  height?: string;
  class?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showCursor?: boolean;
  showYAxisLabels?: boolean;
  showXAxisLabels?: boolean;
  layout?: "dodge" | "stack";
  stackId?: string;
}

export const BarChart = (props: BarChartProps) => {
  const merged = mergeProps({
    width: "w-125",
    height: "h-62.5",
    showGrid: true,
    showTooltip: true,
    showCursor: true,
    showYAxisLabels: true,
    showXAxisLabels: true,
    layout: "dodge" as const,
    stackId: "defaultStack",
  }, props);

  // For dodge layout, we don't use stackId. For stack layout, we use the same stackId for all bars
  const getStackId = (index: number) => {
    if (merged.layout === "stack") {
      return merged.stackId;
    }
    // For dodge layout, each bar gets its own stackId or no stackId
    return undefined;
  };

  return (
    <div class={`${merged.height} text-sm ${merged.width} m-6 ${merged.class || ""}`}>
      <Chart data={merged.data}>
        <Axis axis="y" position="left">
          {merged.showYAxisLabels && <AxisLabel />}
          {merged.showGrid && <AxisGrid class="opacity-20" />}
        </Axis>
        
        <For each={merged.bars}>
          {(bar, index) => (
            <Bar 
              dataKey={bar.dataKey} 
              stackId={getStackId(index())}
              class={bar.class || bar.color || "fill-primary"}
            />
          )}
        </For>
        
        <Axis axis="x" position="bottom" dataKey={merged.xAxisKey}>
          {merged.showXAxisLabels && <AxisLabel />}
          {merged.showCursor && (
            <AxisCursor
              stroke-dasharray="10,10"
              stroke-width={2}
              class="stroke-base-content/70 transition-opacity"
            />
          )}
          <Show when={merged.showTooltip}>
            <AxisTooltip class="rounded-md text-xs overflow-hidden shadow-lg border border-base-300 bg-base-100">
              {(tooltipProps: any) => (
                <>
                  <div class="bg-base-200 border-b border-base-300 px-2 py-1 font-medium">
                    <p>{tooltipProps.data[merged.xAxisKey]}</p>
                  </div>
                  <For each={merged.bars}>
                    {(bar) => (
                      <div class="flex items-center px-2 py-1">
                        <div class={`rounded-full size-2 ${bar.color?.replace('fill-', 'bg-') || 'bg-primary'}`} />
                        <p class="grow ml-1.5">{bar.label || bar.dataKey}</p>
                        <p class="ml-3">{tooltipProps.data[bar.dataKey]}</p>
                      </div>
                    )}
                  </For>
                </>
              )}
            </AxisTooltip>
          </Show>
        </Axis>
      </Chart>
    </div>
  );
};