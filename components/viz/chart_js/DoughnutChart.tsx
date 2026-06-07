import { createMemo } from "solid-js";

import ChartComponent from "./ChartComponent";

import type { ChartConfiguration, ChartData } from "chart.js";

export interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  title?: string;
  className?: string;
  options?: ChartConfiguration<"doughnut">["options"];
  cutout?: string | number;
}

/**
 * Renders a Chart.js doughnut chart with percentage-aware tooltips. The inner cutout
 * size defaults to `"50%"` and can be overridden via the `cutout` prop.
 */
export const DoughnutChart = (props: DoughnutChartProps) => {
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
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${context.formattedValue} (${percentage}%)`;
            },
          },
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
      cutout: props.cutout || "50%",
      // Merge any other top-level options
      ...props.options,
    },
    type: "doughnut",
  }));

  return <ChartComponent chartConfig={chartConfig()} class={props.className} />;
};
