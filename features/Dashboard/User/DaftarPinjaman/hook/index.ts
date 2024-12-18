"use client";
import { useState } from "react";

const useDaftarPinjamUserFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  let dateValue = new Date(selectedData?.detailPeminjamanRuangan[0]?.date);
  let endDateValue = selectedData?.detailPeminjamanRuangan[0]?.endDate && new Date(selectedData?.detailPeminjamanRuangan[0]?.endDate);

  return {
    isOpen,
    setIsOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedData,
    setSelectedData,
    dateValue,
    endDateValue,
  };
};

export default useDaftarPinjamUserFeature;
