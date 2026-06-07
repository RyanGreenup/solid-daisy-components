import { SolidApexCharts } from "solid-apexcharts";
import { createMemo, createSignal, splitProps, Show } from "solid-js";
import { tv } from "tailwind-variants";

export const apexChartVariants = tv({
  base: "w-full",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "h-96",
      md: "h-80",
      sm: "h-64",
      xl: "h-[500px]",
    },
  },
});

type ApexChartVariants = Parameters<typeof apexChartVariants>[0];

export interface ApexChartProps {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "radialBar"
    | "candlestick"
    | "polarArea"
    | "boxPlot";
  series: any[];
  options?: ApexCharts.ApexOptions;
  width?: string | number;
  height?: string | number;
  class?: string;
  size?: ApexChartVariants["size"];
}

/**
 * A wrapper around `solid-apexcharts` that renders any ApexCharts chart type (line, bar, pie, etc.).
 * Handles chart re-creation on type changes and exposes tailwind-variants size presets.
 * @param props - Chart type, series data, ApexCharts options, and optional size/class overrides.
 */
export const ApexChart = (props: ApexChartProps) => {
  const [local] = splitProps(props, [
    "type",
    "series",
    "options",
    "width",
    "height",
    "size",
    "class",
  ]);

  // Create stable references for the chart to prevent unnecessary re-renders
  const [chartKey, setChartKey] = createSignal(0);
  const [isUpdating, setIsUpdating] = createSignal(false);

  // Create reactive memo for chart options with better stability
  const chartOptions = createMemo((prev: ApexCharts.ApexOptions | undefined) => {
    const newOptions: ApexCharts.ApexOptions = {
      chart: {
        background: "transparent",
        fontFamily: "inherit",
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        type: local.type,
        ...local.options?.chart,
      },
      theme: {
        mode: "light" as const,
        ...local.options?.theme,
      },
      ...local.options,
    };

    // Force re-render if chart type changes to prevent ApexCharts internal state issues
    if (
      prev &&
      (prev.chart?.type !== newOptions.chart?.type || prev.chart?.id !== newOptions.chart?.id)
    ) {
      // Use a more aggressive re-creation strategy
      setIsUpdating(true);
      setTimeout(() => {
        setChartKey((k) => k + 1);
        setTimeout(() => setIsUpdating(false), 50);
      }, 10);
    }

    return newOptions;
  });

  const containerClass = createMemo(() =>
    apexChartVariants({
      class: local.class,
      size: local.size,
    }),
  );

  // Ensure series is stable and properly formatted
  const stableSeries = createMemo(() => {
    if (!local.series) {
      return [];
    }
    return Array.isArray(local.series)
      ? local.series.map((s) => ({ ...s })) // Deep copy to prevent reference issues
      : local.series;
  });

  return (
    <div class={containerClass()}>
      <Show when={!isUpdating()}>
        <SolidApexCharts
          key={chartKey()}
          type={local.type}
          series={stableSeries()}
          options={chartOptions()}
          width={local.width || "100%"}
          height={local.height || "100%"}
        />
      </Show>
      <Show when={isUpdating()}>
        <div class="flex items-center justify-center h-full">
          <div class="loading loading-spinner loading-lg" />
        </div>
      </Show>
    </div>
  );
};
