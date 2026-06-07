import { createMemo } from "solid-js";

import ChartComponent from "./ChartComponent";

import type { ChartConfiguration } from "chart.js";

export interface PolarAreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
  className?: string;
  options?: ChartConfiguration["options"];
}

/**
 * Renders a Chart.js polar area chart where each segment's radius encodes its value.
 * Tooltips show the label and radial value; accepts `options` overrides.
 */
export const PolarAreaChart = (props: PolarAreaChartProps) => {
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
          callbacks: {
            label: (context: any) => {
              const label = context.label || "";
              const value = context.parsed.r || context.parsed;
              return `${label}: ${value}`;
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
      scales: {
        r: {
          beginAtZero: true,
          ticks: {
            display: true,
          },
        },
        // Merge any additional scale options
        ...(props.options?.scales && props.options.scales),
      },
      // Merge any other top-level options
      ...props.options,
    },
    type: "polarArea",
  }));

  return <ChartComponent chartConfig={chartConfig()} class={props.className} />;
};
