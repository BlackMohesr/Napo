"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Application } from "@/types/applications";
import { useMemo, useState } from "react";

interface Props {
  data: Application[];
}

export function ApplicationDataTable({ data }: Props) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Add a virtual 'search' field to each row
  const dataWithSearch = useMemo(() =>
    data.map((row) => ({
      ...row,
      search: `${row["Name English"] ?? ""} ${row["Application Id"] ?? ""}`,
    })),
    [data]
  );

  const columns = useMemo<ColumnDef<Application & { search: string }>[]>(
    () => [
      {
        accessorKey: "Application Id",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Application Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-mono">{row.getValue("Application Id")}</span>
        ),
      },
      {
        accessorKey: "Name English",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "Institution Program English - 1",
        header: "Program",
      },
      {
        accessorKey: "Institution Campus English",
        header: "Campus",
      },
      {
        accessorKey: "Application Category",
        header: "School Type",
        cell: ({ row }) => (
          <Badge variant={row.getValue("Application Category") === "Current Government" ? "default" : "secondary"}>
            {row.getValue("Application Category") === "Current Government"?"Public":"Private"}
          </Badge>
        ),
      },
      {
        accessorKey: "search",
        header: "Search",
        filterFn: (row, columnId, filterValue) => {
          return String(row.getValue(columnId)).toLowerCase().includes(String(filterValue).toLowerCase());
        },
        enableHiding: true,
      },
    ],
    []
  );

  const table = useReactTable({
    data: dataWithSearch,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Unified search only on the 'search' column

  // Pagination info
  const totalFiltered = table.getFilteredRowModel().rows.length;
  //const pageSize = table.getState().pagination?.pageSize || 10;
  const pageSize = 20;
  const pageIndex = table.getState().pagination?.pageIndex || 0;
  const totalPages = Math.ceil(totalFiltered / pageSize);

  return (
    <div className="w-full">
      {/* <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search by Name or Application ID..."
          value={searchValue}
          onChange={(event) => {
            table.getColumn("search")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <div className="ml-auto text-sm text-muted-foreground">
          Total Applications: <span className="font-semibold">{totalApplications}</span>
        </div>
      </div> */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers
                  .filter((header) => header.column.id !== "search")
                  .map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const app = row.original;
                const hasApprovedDoc = app.OnlineUploadedDocuments?.some((doc) =>
                  doc.fileName.toLowerCase().includes("university approved document")
                );
                return (
                  <TableRow
                    key={row.id}
                    className={`cursor-pointer transition-colors ${
                      hasApprovedDoc ? "bg-green-100 dark:bg-green-900/30" : "hover:bg-muted"
                    }`}
                    onClick={() => router.push(`/application/${app["Application Id"]}`, { scroll: false })}
                  >
                    {row.getVisibleCells()
                      .filter((cell) => cell.column.id !== "search")
                      .map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length - 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground text-sm">
          Page <span className="font-semibold">{pageIndex + 1}</span> of <span className="font-semibold">{totalPages}</span> | Showing <span className="font-semibold">{table.getRowModel().rows.length}</span> of <span className="font-semibold">{totalFiltered}</span> filtered
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 