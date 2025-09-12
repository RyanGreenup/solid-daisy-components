import { ChartConfiguration } from "chart.js";
import ChartComponent from "./ChartComponent";
import { JSX, createMemo } from "solid-js";

export interface ScatterChartProps {
  data: {
    datasets: {
      label: string;
      data: {
        x: number;
        y: number;
      }[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      pointRadius?: number;
      pointHoverRadius?: number;
      showLine?: boolean;
    }[];
  };
  title?: string;
  className?: string;
  options?: ChartConfiguration['options'];
}

export const ScatterChart = (props: ScatterChartProps) => {
  // Create a reactive memo for the chart configuration
  // This ensures the ChartComponent re-renders when props change
  const chartConfig = createMemo<ChartConfiguration>(() => {
    return {
      type: 'scatter',
      data: {
        // Create new array references to ensure reactivity
        datasets: props.data.datasets.map(dataset => ({
          ...dataset,
          data: [...dataset.data] // Create new array reference
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
            mode: 'nearest' as const,
            intersect: false,
            callbacks: {
              label: (context: any) => {
                const point = context.parsed;
                return `${context.dataset.label}: (${point.x}, ${point.y})`;
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
            display: true
          },
          y: {
            type: 'linear' as const,
            display: true
          },
          // Merge any additional scale options
          ...(props.options?.scales && props.options.scales)
        },
        elements: {
          point: {
            radius: 4,
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