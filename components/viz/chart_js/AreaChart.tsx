import { ChartConfiguration } from "chart.js";
import ChartComponent from "./ChartComponent";
import { JSX, createMemo } from "solid-js";

export interface AreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      borderWidth?: number;
      fill?: boolean | string | number;
      tension?: number;
    }[];
  };
  title?: string;
  className?: string;
  options?: ChartConfiguration['options'];
  stacked?: boolean;
}

export const AreaChart = (props: AreaChartProps) => {
  // Create a reactive memo for the chart configuration
  // This ensures the ChartComponent re-renders when props change
  const chartConfig = createMemo<ChartConfiguration>(() => {
    return {
      type: 'line',
      data: {
        // Create new array references to ensure reactivity
        labels: [...props.data.labels],
        datasets: props.data.datasets.map(dataset => ({
          ...dataset,
          data: [...dataset.data], // Create new array reference
          fill: dataset.fill !== undefined ? dataset.fill : true,
          tension: dataset.tension !== undefined ? dataset.tension : 0.4
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest' as const,
          intersect: false,
          axis: 'x' as const
        },
        plugins: {
          legend: {
            display: true,
            position: 'top' as const
          },
          tooltip: {
            mode: 'index' as const,
            intersect: false
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
            display: true
          },
          y: {
            display: true,
            beginAtZero: true,
            stacked: props.stacked
          },
          // Merge any additional scale options
          ...(props.options?.scales && props.options.scales)
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 6
          },
          line: {
            tension: 0.4
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