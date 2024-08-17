import React from "react";

const HeroSection = ({
  handleOpenDialog,
}: {
  handleOpenDialog: () => void;
}) => {
  return (
    <div className="relative isolate h-[100vh] px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-400 to-indigo-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 mx-auto w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 md:w-full md:-translate-y-2/3">
        <div className="flex justify-center sm:mb-8">
          <div className="relative rounded-full border-b px-3 py-1 text-center text-xs leading-6 text-gray-600 ring-0 ring-gray-900/10 hover:ring-gray-900/20 md:border-b-0 md:text-start md:text-sm md:ring-1">
            Pinjam ruang perpus sekarang lebih mudah{" "}
            <button
              onClick={handleOpenDialog}
              className="font-semibold text-cyan-600"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Baca lebih lanjut <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
        <div className="mt-4 text-center md:mt-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Peminjaman Ruang Perpustakaan dan Pusat Layanan Digital UMS
          </h1>
          <p className="mt-4 text-sm leading-normal text-gray-600 md:mt-6 md:text-lg md:leading-8">
            Sistem peminjaman ruang perpustakaan UMS memudahkan civitas
            akademika untuk meminjam ruang perpustakaan secara online.
          </p>
        </div>
      </div>
      <div
        className="absolute right-0 -z-10 transform-gpu overflow-x-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-400 to-cyan-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
