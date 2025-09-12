import { ChartConfiguration } from "chart.js";
import ChartComponent from "./ChartComponent";
import { createMemo } from "solid-js";

export interface BubbleChartProps {
  data: {
    datasets: {
      label: string;
      data: {
        x: number;
        y: number;
        r: number;
      }[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  title?: string;
  className?: string;
  options?: ChartConfiguration['options'];
}

export const BubbleChart = (props: BubbleChartProps) => {
  // Create a reactive memo for the chart configuration
  const chartConfig = createMemo<ChartConfiguration>(() => {
    return {
      type: 'bubble',
      data: {
        // Create new array references to ensure reactivity
        datasets: props.data.datasets.map(dataset => ({
          ...dataset,
          data: [...dataset.data], // Create new array reference
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest' as const,
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top' as const
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const point = context.parsed;
                return `${context.dataset.label}: (${point.x}, ${point.y}, ${point._custom || point.r})`;
              }
            }
          },
          ...(props.title && {
            title: {
              display: true,
              text: props.title
            }
          }),
          // Merge any additional plugin options
          ...(props.options?.plugins && props.options.plugins)
        },
        scales: {
          x: {
            type: 'linear' as const,
            position: 'bottom' as const,
            beginAtZero: true
          },
          y: {
            type: 'linear' as const,
            beginAtZero: true
          },
          // Merge any additional scale options
          ...(props.options?.scales && props.options.scales)
        },
        elements: {
          point: {
            hoverRadius: 8
          },
          // Merge any additional element options
          ...(props.options?.elements && props.options.elements)
        },
        // Merge any other top-level options
        ...props.options
      }
    };
  });

  return <ChartComponent chartConfig={chartConfig()} className={props.className} />;
};