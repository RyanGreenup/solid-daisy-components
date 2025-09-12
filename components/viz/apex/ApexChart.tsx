import { SolidApexCharts } from 'solid-apexcharts';
import { tv } from "tailwind-variants";
import { splitProps, createMemo, JSX, createSignal, createEffect } from "solid-js";

export const apexChartVariants = tv({
  base: "w-full",
  variants: {
    size: {
      sm: "h-64",
      md: "h-80", 
      lg: "h-96",
      xl: "h-[500px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});

type ApexChartVariants = Parameters<typeof apexChartVariants>[0];

export interface ApexChartProps extends ApexChartVariants {
  type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'scatter' | 'bubble' | 'heatmap' | 'radialBar' | 'candlestick' | 'polarArea';
  series: any[];
  options?: any;
  width?: string | number;
  height?: string | number;
  class?: string;
  [key: string]: any;
}

export const ApexChart = (props: ApexChartProps) => {
  const [local, others] = splitProps(props, ["type", "series", "options", "width", "height", "size", "class"]);
  
  // Create stable references for the chart to prevent unnecessary re-renders
  const [chartKey, setChartKey] = createSignal(0);
  const [isUpdating, setIsUpdating] = createSignal(false);

  // Create reactive memo for chart options with better stability
  const chartOptions = createMemo((prev) => {
    const newOptions = {
      chart: {
        type: local.type,
        background: 'transparent',
        fontFamily: 'inherit',
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        ...local.options?.chart
      },
      theme: {
        mode: 'light' as const,
        ...local.options?.theme
      },
      ...local.options
    };
    
    // Force re-render if chart type changes to prevent ApexCharts internal state issues
    if (prev && (
      prev.chart?.type !== newOptions.chart.type || 
      prev.chart?.id !== newOptions.chart?.id
    )) {
      // Use a more aggressive re-creation strategy
      setIsUpdating(true);
      setTimeout(() => {
        setChartKey(k => k + 1);
        setTimeout(() => setIsUpdating(false), 50);
      }, 10);
    }
    
    return newOptions;
  });

  const containerClass = createMemo(() => 
    apexChartVariants({
      size: local.size,
      class: local.class
    })
  );

  // Ensure series is stable and properly formatted
  const stableSeries = createMemo(() => {
    if (!local.series) return [];
    return Array.isArray(local.series) ? 
      local.series.map(s => ({ ...s })) : // Deep copy to prevent reference issues
      local.series;
  });

  return (
    <div class={containerClass()}>
      {!isUpdating() && (
        <SolidApexCharts
          key={chartKey()}
          type={local.type}
          series={stableSeries()}
          options={chartOptions()}
          width={local.width || "100%"}
          height={local.height || "100%"}
          {...others}
        />
      )}
      {isUpdating() && (
        <div class="flex items-center justify-center h-full">
          <div class="loading loading-spinner loading-lg"></div>
        </div>
      )}
    </div>
  );
};