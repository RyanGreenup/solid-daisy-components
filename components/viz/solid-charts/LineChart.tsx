import { Axis, AxisGrid, AxisLabel, AxisLine, Chart, Line } from "solid-charts";
import { For, mergeProps, Show } from "solid-js";

export type LineData = Record<string, any>;

export interface LineConfig {
  dataKey: string;
  strokeWidth?: number;
  class?: string;
  color?: string;
}

export interface LineChartProps {
  data: LineData[];
  lines: LineConfig[];
  xAxisKey: string;
  width?: string;
  height?: string;
  class?: string;
  showGrid?: boolean;
  showXAxisLine?: boolean;
  showYAxisLabels?: boolean;
  showXAxisLabels?: boolean;
}

/**
 * A line chart component built on the `solid-charts` library.
 * Renders one or more lines over a shared x-axis with optional grid, axis labels, and axis line.
 * @param props - Chart data, line configurations, x-axis key, and display toggles.
 */
export const LineChart = (props: LineChartProps) => {
  const merged = mergeProps(
    {
      height: "h-37.5",
      showGrid: true,
      showXAxisLabels: true,
      showXAxisLine: true,
      showYAxisLabels: true,
      strokeWidth: 3,
      width: "w-125",
    },
    props,
  );

  return (
    <div class={`${merged.height} ${merged.width} ${merged.class || ""}`}>
      <Chart data={merged.data}>
        <Axis axis="y" position="left">
          <Show when={merged.showYAxisLabels}>
            <AxisLabel />
          </Show>
          <Show when={merged.showGrid}>
            <AxisGrid class="opacity-20" />
          </Show>
        </Axis>
        <Axis axis="x" position="bottom" dataKey={merged.xAxisKey}>
          <Show when={merged.showXAxisLabels}>
            <AxisLabel />
          </Show>
          <Show when={merged.showXAxisLine}>
            <AxisLine />
          </Show>
        </Axis>
        <For each={merged.lines}>
          {(line) => (
            <Line
              dataKey={line.dataKey}
              stroke-width={line.strokeWidth || merged.strokeWidth}
              class={line.class || line.color || "stroke-primary"}
            />
          )}
        </For>
      </Chart>
    </div>
  );
};
