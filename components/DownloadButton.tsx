// @ts-ignore
import Download from "lucide-solid/icons/download";
import { createSignal, Show, splitProps } from "solid-js";
import { ColumnDef } from "@tanstack/solid-table";
import { exportTableToCsv } from "../lib/utils/csv-export";
import { Button, ButtonProps } from "./Button";

const DEBUG = false;

type DownloadButtonProps<T> = ButtonProps & {
  /**
   * The data to export - can be static array or reactive function
   */
  data: T[] | (() => T[]);
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
};

/**
 * A reusable download button component that exports data to CSV
 * with visual feedback. Built on top of the Button component.
 */
export const DownloadButton = <T,>(props: DownloadButtonProps<T>) => {
  const [isDownloading, setIsDownloading] = createSignal(false);

  const [downloadProps, buttonProps] = splitProps(props, [
    "data",
    "columns",
    "filename",
    "onExport",
    "loadingTimeout",
  ]);

  const {
    data,
    columns,
    filename = "data.csv",
    onExport,
    loadingTimeout = 1000,
  } = downloadProps;

  const handleDownload = async (
    e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element },
  ) => {
    try {
      setIsDownloading(true);

      // Resolve data at click time (handles both static arrays and reactive functions)
      const currentData = typeof data === "function" ? data() : data;

      if (DEBUG) {
        console.log("📥 Debug: Download button clicked", {
          dataLength: currentData.length,
          dataPreview: currentData.slice(0, 2),
          filename,
          hasColumns: !!columns,
          dataType: typeof data,
        });
      }

      if (onExport) {
        // Use custom export function if provided
        onExport(currentData);
      } else {
        // Use built-in CSV export
        exportTableToCsv(currentData, columns, filename);
      }

      // Show loading state briefly for user feedback
      setTimeout(() => setIsDownloading(false), loadingTimeout);
    } catch (error) {
      console.error("Failed to download data:", error);
      setIsDownloading(false);
    }

    // Call the original onClick if provided
    if (typeof buttonProps.onClick === "function") {
      buttonProps.onClick(e);
    }
  };

  const isDisabled = () => {
    const currentData = typeof data === "function" ? data() : data;
    return buttonProps.disabled || isDownloading() || currentData.length === 0;
  };

  return (
    <Button
      color="primary"
      size="sm"
      {...buttonProps}
      onClick={handleDownload}
      disabled={isDisabled()}
    >
      <Show
        when={!isDownloading()}
        fallback={<span class="loading loading-spinner loading-xs" />}
      >
        <Download class="w-4 h-4" />
      </Show>
      <Show
        when={buttonProps.children}
        fallback={
          <Show when={isDownloading()} fallback="Download CSV">
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
