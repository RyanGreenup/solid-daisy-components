import Download from "lucide-solid/icons/download";
import { createSignal, JSX, Show } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import { exportTableToCsv } from "~/lib/utils/csv-export";

interface DownloadButtonProps<T> extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The data to export
   */
  data: T[];
  /**
   * Optional column definitions for structured export
   */
  columns?: ColumnDef<T>[];
  /**
   * Filename for the downloaded file (default: 'data.csv')
   */
  filename?: string;
  /**
   * Optional custom export function
   */
  onExport?: (data: T[]) => void;
  /**
   * Optional loading timeout (default: 1000ms)
   */
  loadingTimeout?: number;
}

/**
 * A reusable download button component that exports data to CSV
 * with visual feedback. Accepts all standard button props.
 */
export const DownloadButton = <T,>(props: DownloadButtonProps<T>) => {
  const [isDownloading, setIsDownloading] = createSignal(false);
  
  const {
    data,
    columns,
    filename = 'data.csv',
    onExport,
    loadingTimeout = 1000,
    onClick,
    class: className = "btn btn-primary btn-sm gap-2",
    disabled,
    children,
    ...buttonProps
  } = props;

  const handleDownload = async (e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    try {
      setIsDownloading(true);
      
      if (onExport) {
        // Use custom export function if provided
        onExport(data);
      } else {
        // Use built-in CSV export
        exportTableToCsv(data, columns, filename);
      }
      
      // Show loading state briefly for user feedback
      setTimeout(() => setIsDownloading(false), loadingTimeout);
    } catch (error) {
      console.error("Failed to download data:", error);
      setIsDownloading(false);
    }
    
    // Call the original onClick if provided
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  const isDisabled = () => disabled || isDownloading() || data.length === 0;

  return (
    <button
      {...buttonProps}
      class={className}
      onClick={handleDownload}
      disabled={isDisabled()}
    >
      <Show when={!isDownloading()} fallback={<span class="loading loading-spinner loading-xs" />}>
        <Download class="w-4 h-4" />
      </Show>
      <Show 
        when={children} 
        fallback={
          <Show
            when={isDownloading()}
            fallback="Download CSV"
          >
            Downloading...
          </Show>
        }
      >
        {children}
      </Show>
    </button>
  );
};

export default DownloadButton;