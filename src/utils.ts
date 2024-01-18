import { DateTime } from 'luxon'
import type Excel from 'exceljs'

export function getString (cell: Excel.Cell): string {
  return cell.value?.toString().trim() ?? ''
};

export function isValue (cell: Excel.Cell, match: string, defaultValue: boolean): boolean {
  return getString(cell).toLowerCase() === match.toLowerCase()
}

export function getUrl (cell: Excel.Cell): URL {
  return new URL(getString(cell))
}

export function getInteger (cell: Excel.Cell): number {
  return parseInt(getString(cell).length === 0 ? '0' : getString(cell), 10)
}

export function getDate (cell: Excel.Cell): DateTime | undefined {
  if (getString(cell).length === 0) return undefined
  return DateTime.fromISO(getString(cell))
}

export function padDate (value: number | string): string {
  if (String(value).length === 1) return `0${value}`
  return String(value)
}
