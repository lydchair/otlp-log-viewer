import { ColumnDef, Table, TableOptions } from "@tanstack/react-table"

export interface FacetedFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FacetedFilter {
  column: string
  title: string
  options: FacetedFilterOption[]
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  facetedFilter?: FacetedFilter
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  options?: Partial<TableOptions<TData>>
  searchKey?: string
  onRowClick?: (row: TData) => void
  renderExpandedRow?: (row: TData) => React.ReactNode
  expandedRows?: Set<string>
  getRowId?: (row: TData) => string
  facetedFilter?: FacetedFilter
}
