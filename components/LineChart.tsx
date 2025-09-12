import { JSX, For, mergeProps } from "solid-js";
import { Axis, AxisGrid, AxisLabel, AxisLine, Chart, Line } from 'solid-charts';

export interface LineData {
  [key: string]: any;
}

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

export const LineChart = (props: LineChartProps) => {
  const merged = mergeProps({
    width: "w-125",
    height: "h-37.5",
    showGrid: true,
    showXAxisLine: true,
    showYAxisLabels: true,
    showXAxisLabels: true,
    strokeWidth: 3,
  }, props);

  return (
    <div class={`${merged.height} ${merged.width} ${merged.class || ""}`}>
      <Chart data={merged.data}>
        <Axis axis="y" position="left">
          {merged.showYAxisLabels && <AxisLabel />}
          {merged.showGrid && <AxisGrid class="opacity-20" />}
        </Axis>
        <Axis axis="x" position="bottom" dataKey={merged.xAxisKey}>
          {merged.showXAxisLabels && <AxisLabel />}
          {merged.showXAxisLine && <AxisLine />}
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