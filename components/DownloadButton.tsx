import Download from "lucide-solid/icons/download";
import { createSignal, Show, splitProps } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import { exportTableToCsv } from "~/lib/utils/csv-export";
import { Button, ButtonProps } from "./Button";

interface DownloadButtonProps<T> extends ButtonProps {
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
 * with visual feedback. Built on top of the Button component.
 */
export const DownloadButton = <T,>(props: DownloadButtonProps<T>) => {
  const [isDownloading, setIsDownloading] = createSignal(false);
  
  const [downloadProps, buttonProps] = splitProps(props, [
    'data',
    'columns', 
    'filename',
    'onExport',
    'loadingTimeout',
    'onClick'
  ]);
  
  const {
    data,
    columns,
    filename = 'data.csv',
    onExport,
    loadingTimeout = 1000,
    onClick,
  } = downloadProps;

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

  const isDisabled = () => buttonProps.disabled || isDownloading() || data.length === 0;

  return (
    <Button
      {...buttonProps}
      color={buttonProps.color || "primary"}
      size={buttonProps.size || "sm"}
      onClick={handleDownload}
      disabled={isDisabled()}
    >
      <Show when={!isDownloading()} fallback={<span class="loading loading-spinner loading-xs" />}>
        <Download class="w-4 h-4" />
      </Show>
      <Show 
        when={buttonProps.children} 
        fallback={
          <Show
            when={isDownloading()}
            fallback="Download CSV"
          >
            Downloading...
          </Show>
        }
      >
        {buttonProps.children}
      </Show>
    </Button>
  );
};

export default DownloadButton;