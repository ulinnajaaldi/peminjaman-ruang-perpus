"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { cn, statusColor } from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "ruangan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ruangan" />
    ),
    cell: ({ row }) => {
      const datas = row.original;

      return <span>{datas.detailPeminjamanRuangan[0].ruangan}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      let dateValue = new Date(datas.detailPeminjamanRuangan[0].date);
      let endDateValue = datas.detailPeminjamanRuangan[0].endDate && new Date(datas.detailPeminjamanRuangan[0].endDate);
      return (
        <span>
          {dateValue.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {endDateValue && ` - ${endDateValue.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "hours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span>
          {datas.detailPeminjamanRuangan[0].startHour} -{" "}
          {datas.detailPeminjamanRuangan[0].endHour}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "necessity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kebutuhan" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span className="line-clamp-1">
          {datas.detailPeminjamanRuangan[0].necessity}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "sapras",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sapras" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <div>
          {datas.detailPeminjamanRuangan[0].saprasPeminjaman.length > 0 ? (
            datas.detailPeminjamanRuangan[0].saprasPeminjaman.map(
              (item: any, index: number) => (
                <span key={index} className="block">
                  {item.sapras.name} - {item.quantity}/pcs
                </span>
              ),
            )
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const datas = row.original;
      return (
        <span className={cn(`${statusColor(datas.status)}`)}>
          {datas.status}
        </span>
      );
    },
  },
];
