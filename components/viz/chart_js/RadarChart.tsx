import { createMemo } from "solid-js";

import ChartComponent from "./ChartComponent";

import type { ChartConfiguration } from "chart.js";

export interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      borderWidth?: number;
      borderDash?: number[];
      fill?: boolean;
      tension?: number;
      pointBackgroundColor?: string | string[];
      pointBorderColor?: string | string[];
      pointBorderWidth?: number;
      pointRadius?: number;
      pointHoverRadius?: number;
      pointHoverBackgroundColor?: string | string[];
      pointHoverBorderColor?: string | string[];
      pointHoverBorderWidth?: number;
      pointStyle?:
        | "circle"
        | "cross"
        | "crossRot"
        | "dash"
        | "line"
        | "rect"
        | "rectRounded"
        | "rectRot"
        | "star"
        | "triangle";
    }[];
  };
  title?: string;
  className?: string;
  options?: ChartConfiguration["options"];
}

/**
 * Renders a Chart.js radar (spider) chart on a radial linear scale. Supports multiple
 * datasets with per-dataset point and line styling, and accepts `options` overrides.
 */
export const RadarChart = (props: RadarChartProps) => {
  // Create a reactive memo for the chart configuration
  // This ensures the ChartComponent re-renders when props change
  const chartConfig = createMemo<ChartConfiguration>(() => ({
    data: {
      // Create new array references to ensure reactivity
      labels: [...props.data.labels],
      datasets: props.data.datasets.map((dataset) => ({
        ...dataset,
        data: [...dataset.data], // Create new array reference
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "nearest" as const,
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
        ...(props.title && {
          title: {
            display: true,
            text: props.title,
          },
        }),
        // Merge any additional plugin options
        ...(props.options?.plugins && props.options.plugins),
      },
      scales: {
        r: {
          beginAtZero: true,
          angleLines: {
            display: true,
          },
          grid: {
            display: true,
          },
          pointLabels: {
            display: true,
          },
          ticks: {
            display: true,
          },
        },
        // Merge any additional scale options
        ...(props.options?.scales && props.options.scales),
      },
      elements: {
        point: {
          radius: 3,
          hoverRadius: 6,
        },
        line: {
          borderWidth: 2,
        },
        // Merge any additional element options
        ...(props.options?.elements && props.options.elements),
      },
      // Merge any other top-level options
      ...props.options,
    },
    type: "radar",
  }));

  return <ChartComponent chartConfig={chartConfig()} class={props.className} />;
};
