import * as echarts from 'echarts';
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { tv } from "tailwind-variants";
import { splitProps } from "solid-js";

export const echartsVariants = tv({
  base: "relative w-full",
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

type EChartsVariants = Parameters<typeof echartsVariants>[0];

export interface EChartsComponentProps extends EChartsVariants {
  option: any; // ECharts option configuration object
  theme?: string | object;
  className?: string;
  loading?: boolean;
  [key: string]: any;
}

export default function EChartsComponent(props: EChartsComponentProps) {
  let chartRef!: HTMLDivElement;
  let chartInstance: echarts.ECharts | null = null;
  const [isMounted, setIsMounted] = createSignal(false);
  const [local, others] = splitProps(props, ["option", "theme", "size", "className", "loading"]);

  onMount(() => {
    // Initialize ECharts instance
    chartInstance = echarts.init(chartRef, local.theme || 'default');
    
    // Set initial option
    if (local.option) {
      chartInstance.setOption(local.option);
    }
    
    // Handle loading state
    if (local.loading) {
      chartInstance.showLoading();
    }
    
    setIsMounted(true);

    // Handle window resize
    const handleResize = () => {
      chartInstance?.resize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup resize listener on component unmount
    onCleanup(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  createEffect(() => {
    if (chartInstance && isMounted()) {
      // Update chart option when props change
      if (local.option) {
        chartInstance.setOption(local.option, true); // true = notMerge for complete replacement
      }
      
      // Handle loading state
      if (local.loading) {
        chartInstance.showLoading();
      } else {
        chartInstance.hideLoading();
      }
    }
  });

  onCleanup(() => {
    chartInstance?.dispose();
  });

  const containerClass = () => 
    echartsVariants({
      size: local.size,
      class: local.className
    });

  return (
    <div
      class={containerClass()}
      style="min-height: 300px;"
      {...others}
    >
      <div ref={chartRef} style="width: 100%; height: 100%;"></div>
      <DarkModeEChartsFilter />
    </div>
  );
}

function DarkModeEChartsFilter() {
  // ECharts handles dark mode better than Canvas filters, but we can add custom styling if needed
  const css = `
    @media (prefers-color-scheme: dark) {
      /* ECharts dark theme handling - could be enhanced based on theme selection */
    }
  `;
  return <style>{css}</style>;
}