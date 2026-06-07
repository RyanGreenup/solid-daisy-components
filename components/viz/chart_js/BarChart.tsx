import { createMemo } from "solid-js";

import ChartComponent from "./ChartComponent";

import type { ChartConfiguration, ChartData } from "chart.js";

export interface BarChartProps {
  data: ChartData<"bar">;
  title?: string;
  className?: string;
  options?: ChartConfiguration<"bar">["options"];
  horizontal?: boolean;
}

/**
 * Renders a Chart.js bar chart. Supports vertical and horizontal orientations via
 * the `horizontal` prop, and accepts standard Chart.js `data` and `options` overrides.
 */
export const BarChart = (props: BarChartProps) => {
  // Create a reactive memo for the chart configuration
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
      indexAxis: props.horizontal ? ("y" as const) : ("x" as const),
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
        y: {
          beginAtZero: true,
        },
        // Merge any additional scale options
        ...(props.options?.scales && props.options.scales),
      },
      // Merge any other top-level options
      ...props.options,
    },
    type: "bar",
  }));

  return <ChartComponent chartConfig={chartConfig()} class={props.className} />;
};
