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
  const [isDarkMode, setIsDarkMode] = createSignal(false);
  const [local, others] = splitProps(props, ["option", "theme", "size", "className", "loading"]);

  // Function to detect dark mode preference
  const checkDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Function to get the appropriate theme
  const getTheme = () => {
    if (local.theme) {
      return local.theme; // Use explicitly provided theme
    }
    return isDarkMode() ? 'dark' : 'light';
  };

  onMount(() => {
    // Set initial dark mode state
    setIsDarkMode(checkDarkMode());

    // Initialize ECharts instance with proper theme
    chartInstance = echarts.init(chartRef, getTheme(), {
      renderer: 'canvas' // Ensure we use canvas renderer
    });
    
    // Set initial option
    if (local.option) {
      chartInstance.setOption(local.option);
    }
    
    // Handle loading state
    if (local.loading) {
      chartInstance.showLoading();
    }
    
    setIsMounted(true);

    // Listen for dark mode changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    // Handle window resize
    const handleResize = () => {
      chartInstance?.resize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup listeners on component unmount
    onCleanup(() => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
      window.removeEventListener('resize', handleResize);
    });
  });

  // Effect to handle dark mode changes
  createEffect(() => {
    if (chartInstance && isMounted() && !local.theme) {
      // Only auto-switch theme if no explicit theme is provided
      const currentTheme = getTheme();
      
      // Dispose current instance and recreate with new theme
      const currentOption = chartInstance.getOption();
      chartInstance.dispose();
      
      chartInstance = echarts.init(chartRef, currentTheme, {
        renderer: 'canvas'
      });
      
      // Restore the chart with current option
      if (currentOption) {
        chartInstance.setOption(currentOption as any);
      }
      
      // Handle loading state
      if (local.loading) {
        chartInstance.showLoading();
      }
    }
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
    </div>
  );
}