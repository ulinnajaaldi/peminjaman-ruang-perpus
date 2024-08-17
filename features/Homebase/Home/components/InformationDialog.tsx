import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InformationDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InformationDialog: React.FC<InformationDialogProps> = (props) => {
  const { isDialogOpen, setIsDialogOpen } = props;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Alur Peminjaman</DialogTitle>
          <DialogDescription>
            Tata Cara Peminjaman Ruang Perpustakaan UMS
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="">
            <h2 className="text-sm font-semibold md:text-lg">
              1. Daftar/Masuk keakun yang sudah didaftarkan
            </h2>
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold md:text-lg">
              2. Pilih Ruangan yang ingin dipinjam
            </h2>
            <p className="mt-1 text-xs text-gray-600 md:mt-4 md:text-base">
              Pilih ruangan yang ingin dipinjam pada halaman ruangan.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold md:text-lg">
              3. Pilih Jadwal Peminjaman
            </h2>
            <p className="mt-1 text-xs text-gray-600 md:mt-4 md:text-base">
              Pilih jadwal peminjaman ruangan sesuai dengan kebutuhan. Pastikan
              ruangan yang ingin dipinjam tersedia pada jadwal yang dipilih.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold md:text-lg">
              4. Ajukan Peminjaman
            </h2>
            <p className="mt-1 text-xs text-gray-600 md:mt-4 md:text-base">
              Isi form peminjaman ruangan dengan lengkap dan benar. Pastikan
              data yang diisi sudah sesuai dengan ketentuan yang berlaku.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-sm font-semibold md:text-lg">
              5. Tunggu Konfirmasi
            </h2>
            <p className="mt-1 text-xs text-gray-600 md:mt-4 md:text-base">
              Tunggu konfirmasi dari admin untuk mengetahui status peminjaman
              ruangan. Cek berkala email yang digunakan untuk peminjaman ruangan
              karena akan ada notifikasi yang dikirimkan.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InformationDialog;
