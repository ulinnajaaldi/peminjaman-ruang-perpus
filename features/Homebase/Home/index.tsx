"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import { useGetRuangan } from "@/useCases/RuanganUseCases";
import InformationDialog from "./components/InformationDialog";
import HeroSection from "./section/HeroSection";
import CalendarInformation from "./section/CalendarInformation";
import HomebaseRuanganFeature from "../Ruangan";

const HomepageFeature = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetRuangan(value, page, limit);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <main>
      <HeroSection handleOpenDialog={handleOpenDialog} />
      <CalendarInformation ruangan={data?.data || []} />
      <HomebaseRuanganFeature
        data={data}
        isLoading={isLoading}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        limit={limit}
        page={page}
      />
      <InformationDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </main>
  );
};

export default HomepageFeature;
