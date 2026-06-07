import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import type { ChartConfiguration } from "chart.js";

// Register the required components
Chart.register(
  BubbleController,
  CategoryScale,
  ArcElement,
  DoughnutController,
  Filler,
  LinearScale,
  RadialLinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  ScatterController,
  PolarAreaController,
  RadarController,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartComponentProps {
  chartConfig: ChartConfiguration;
  className?: string;
}

/**
 * Base Chart.js canvas wrapper for SolidJS. Mounts a Chart instance on a responsive
 * canvas, reactively updates data and options when props change, and applies a
 * dark-mode invert filter. All chart-type components delegate rendering to this component.
 */
export default function ChartComponent(props: ChartComponentProps) {
  let chartRef!: HTMLCanvasElement;
  let chartInstance: Chart | null = null;
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    const config = {
      ...props.chartConfig,
      options: {
        ...props.chartConfig.options,
        maintainAspectRatio: false,
        responsive: true,
      },
    };
    chartInstance = new Chart(chartRef, config);
    setIsMounted(true);
  });

  createEffect(() => {
    if (chartInstance && isMounted()) {
      chartInstance.data = props.chartConfig.data;
      chartInstance.options = {
        ...props.chartConfig.options,
        maintainAspectRatio: false,
        responsive: true,
      };
      chartInstance.update();
    }
  });

  onCleanup(() => {
    chartInstance?.destroy();
  });

  return (
    <div class={`relative w-full ${props.className || ""}`} style={{ "min-height": "300px" }}>
      <canvas ref={chartRef} />
      <DarkModeCanvasFilter />
    </div>
  );
}

function DarkModeCanvasFilter() {
  const css = `@media (prefers-color-scheme: dark) {
      canvas {
        filter: invert(1) hue-rotate(180deg);
      }
    }`;
  return <style>{css}</style>;
}
