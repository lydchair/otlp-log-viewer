"use client"

import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/ui/data-table/data-table-view-options"
import { Input } from "@/components/ui/input"

import { DataTableToolbarProps } from "./types"

export function DataTableToolbar<TData>({
  table,
  searchKey,
  facetedFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={`Search by ${searchKey}...`}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {facetedFilter && table.getColumn(facetedFilter.column) && (
          <DataTableFacetedFilter
            column={table.getColumn(facetedFilter.column)}
            title={facetedFilter.title}
            options={facetedFilter.options}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
