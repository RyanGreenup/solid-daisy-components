/**
 * CSV export utilities for data tables
 */

import { ColumnDef } from '@tanstack/solid-table'

/**
 * Escapes a CSV field value by wrapping in quotes and escaping internal quotes
 */
function escapeCsvField(value: any): string {
  if (value == null) return ''
  
  const stringValue = String(value)
  
  // If the value contains comma, newline, or quote, wrap in quotes
  if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"')) {
    // Escape quotes by doubling them
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  
  return stringValue
}

/**
 * Converts an array of objects to CSV string
 */
export function arrayToCsv<T>(data: T[], columns?: ColumnDef<T>[]): string {
  if (!data.length) return ''
  
  let headers: string[]
  let rows: string[][]
  
  if (columns && columns.length > 0) {
    // Use column definitions to determine headers and extract data
    headers = columns
      .filter(col => col.header && typeof col.header === 'string')
      .map(col => String(col.header))
    
    rows = data.map(row => 
      columns
        .filter(col => col.header && typeof col.header === 'string')
        .map(col => {
          const accessorKey = col.accessorKey as keyof T
          if (accessorKey && row[accessorKey] !== undefined) {
            return row[accessorKey]
          }
          // Fallback for complex accessors or computed columns
          return ''
        })
        .map(value => escapeCsvField(value))
    )
  } else {
    // Fallback: use object keys as headers
    const firstRow = data[0]
    headers = Object.keys(firstRow as object)
    
    rows = data.map(row => 
      headers.map(header => escapeCsvField((row as any)[header]))
    )
  }
  
  // Create CSV content
  const csvHeaders = headers.map(header => escapeCsvField(header)).join(',')
  const csvRows = rows.map(row => row.join(','))
  
  return [csvHeaders, ...csvRows].join('\n')
}

/**
 * Downloads CSV data as a file
 */
export function downloadCsv(csvContent: string, filename: string = 'data.csv'): void {
  // Add BOM for proper UTF-8 encoding in Excel
  const bom = '\uFEFF'
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' })
  
  // Create download link
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  URL.revokeObjectURL(url)
}

/**
 * Exports table data to CSV and triggers download
 */
export function exportTableToCsv<T>(
  data: T[], 
  columns?: ColumnDef<T>[], 
  filename: string = 'table-data.csv'
): void {
  const csvContent = arrayToCsv(data, columns)
  downloadCsv(csvContent, filename)
}