"use client";
import { useState } from "react";

const useDaftarPinjamUserFeature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  let dateValue = new Date(selectedData?.detailPeminjamanRuangan[0]?.date);

  return {
    isOpen,
    setIsOpen,
    isDetailOpen,
    setIsDetailOpen,
    selectedData,
    setSelectedData,
    dateValue,
  };
};

export default useDaftarPinjamUserFeature;
