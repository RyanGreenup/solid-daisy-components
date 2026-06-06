import { ChartConfiguration, ChartData } from "chart.js";
import { createMemo } from "solid-js";

import ChartComponent from "./ChartComponent";

export interface DoughnutChartProps {
  data: ChartData<"doughnut">;
  title?: string;
  className?: string;
  options?: ChartConfiguration<"doughnut">["options"];
  cutout?: string | number;
}

export const DoughnutChart = (props: DoughnutChartProps) => {
  // Create a reactive memo for the chart configuration
  const chartConfig = createMemo<ChartConfiguration>(() => {
    return {
      type: "doughnut",
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
    };
  });

  return <ChartComponent chartConfig={chartConfig()} className={props.className} />;
};
