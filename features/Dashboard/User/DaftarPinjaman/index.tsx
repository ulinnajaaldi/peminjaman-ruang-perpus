"use client";

import React from "react";
import Image from "next/image";

import { cn, statusColor } from "@/lib/utils";
import {
  useGetDaftarPinjamUser,
  useRejectDaftarPinjamUser,
} from "@/useCases/ProsesPinjamUseCases";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useDaftarPinjamUserFeature from "./hook";
import { DataTable } from "./section/data-table";
import { columns } from "./section/columns";

const UserDaftarPinjamanFeature = () => {
  const {
    isOpen,
    setIsOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedData,
    setSelectedData,
    dateValue,
  } = useDaftarPinjamUserFeature();

  const { data, isLoading, refetch } = useGetDaftarPinjamUser();

  const { mutate: mutateDelte } = useRejectDaftarPinjamUser(
    selectedData?.id,
    setIsOpen,
    setSelectedData,
    refetch,
  );

  return (
    <main>
      <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
        Daftar Pinjaman
      </h1>
      <DataTable
        columns={columns}
        data={data?.data?.detail || []}
        isLoading={isLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedData={setSelectedData}
        deleteData={mutateDelte}
        setIsDetailOpen={setIsDetailOpen}
      />
      <AlertDialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin membatalkan?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan membatalkan
              permintaan peminjaman ruang ini.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <Button variant="destructive" asChild>
              <AlertDialogAction
                onClick={() => {
                  mutateDelte();
                }}
              >
                Batalkan
              </AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={isDetailOpen}
        onOpenChange={(isOpen) => setIsDetailOpen(isOpen)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Detail Peminjaman{" "}
              {selectedData?.detailPeminjamanRuangan[0]?.ruangan}
            </DialogTitle>
            <DialogDescription>
              Berikut adalah detail peminjaman ruangan yang telah diajukan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold md:text-lg">
                {dateValue.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p
                className={cn(
                  `text-xs md:text-sm ${statusColor(selectedData?.status)}`,
                )}
              >
                {selectedData?.status}
              </p>
            </div>
            <p className="text-xs sm:text-sm md:text-base">
              Jam Peminjaman :{" "}
              {selectedData?.detailPeminjamanRuangan[0]?.startHour +
                " - " +
                selectedData?.detailPeminjamanRuangan[0]?.endHour}
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Kebutuhan : {selectedData?.detailPeminjamanRuangan[0]?.necessity}
            </p>
            <p className="text-xs sm:text-sm md:text-base">
              Tambahan Lain :{" "}
              {selectedData?.detailPeminjamanRuangan[0]?.additional}
            </p>
            <div>
              <p className="text-sm md:text-base">Sapras yang dipinjam: </p>
              <div className="mt-1 grid grid-cols-2 md:grid-cols-3">
                {selectedData?.detailPeminjamanRuangan[0]?.saprasPeminjaman.map(
                  (item: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 rounded-lg border p-2"
                    >
                      <Image
                        src={item.sapras.images}
                        alt={item.sapras.name}
                        width="100"
                        height="100"
                      />
                      <p className="text-xs sm:text-sm">
                        Jumlah dipinjam {item.quantity} item
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default UserDaftarPinjamanFeature;
