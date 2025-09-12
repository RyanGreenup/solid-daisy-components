import {
  ArcElement,
  BubbleController,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

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

export default function ChartComponent(props: ChartComponentProps) {
  let chartRef!: HTMLCanvasElement;
  let chartInstance: Chart | null = null;
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    const config = {
      ...props.chartConfig,
      options: {
        ...props.chartConfig.options,
        responsive: true,
        maintainAspectRatio: false,
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
        responsive: true,
        maintainAspectRatio: false,
      };
      chartInstance.update();
    }
  });

  onCleanup(() => {
    chartInstance?.destroy();
  });

  return (
    <div
      class={`relative w-full ${props.className || ""}`}
      style="min-height: 300px;"
    >
      <canvas ref={chartRef}></canvas>
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
