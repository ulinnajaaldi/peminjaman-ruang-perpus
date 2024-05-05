"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader, DataTableLoader } from "@/components/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isOpen: boolean;
  setIsOpen: any;
  isLoading: boolean;
  setSelectedData: any;
  deleteData: any;
  setIsDetailOpen: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  isOpen,
  setIsOpen,
  setSelectedData,
  setIsDetailOpen,
  deleteData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnsWithRowNumbers = React.useMemo(
    () => [
      {
        id: "number",
        accessorKey: "number",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="No"
            className="text-center"
          />
        ),
        cell: ({ row }) => {
          const index = row.index + 1;
          return <div className="text-center">{index}</div>;
        },
        enableSorting: false,
      },
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => {
          const datas = row.original as any;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem>
                  <button
                    className="w-full text-start text-green-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDetailOpen(true);
                      setSelectedData(datas);
                    }}
                  >
                    Lihat
                  </button>
                </DropdownMenuItem>
                {datas.status === "Menunggu Persetujuan" && (
                  <DropdownMenuItem>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsOpen(true);
                        setSelectedData(datas);
                      }}
                      className="w-full text-start text-red-600"
                    >
                      Batal
                    </button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, deleteData, isOpen, setIsOpen, setSelectedData, setIsDetailOpen],
  );

  const table = useReactTable({
    data,
    columns: columnsWithRowNumbers,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <h1>Daftar Pinjaman Ruang</h1>
      </div>
      <div className="mb-4 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <DataTableLoader tableLength={7} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs sm:text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="h-24 text-center"
                >
                  Belum ada pinjaman ruang
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
