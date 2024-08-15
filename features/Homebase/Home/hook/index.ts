import { IProsesPinjamAllSchema } from "@/domain/ProsesPinjam";
import { axiosInstanceToken } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useHomeFeature = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [selectedRuangan, setSelectedRuangan] = useState<any>("");

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-peminjaman-ruangan", currentDate, selectedRuangan],
    queryFn: async () => {
      const response = await axiosInstanceToken.get(
        `/v1/api/proses-pinjam?page=1&limit=100?year=${currentDate.getFullYear()}&month=${
          currentDate.getMonth() + 1
        }&ruanganId=${selectedRuangan}`,
      );
      return response.data;
    },
  });

  const getData: IProsesPinjamAllSchema[] = data?.data;

  //   @ts-ignore
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  //   @ts-ignore
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const events = getData?.map((item) => {
    return {
      id: item.id,
      date: new Date(item.detailPeminjamanRuangan[0].date),
      title: item.user.firstName,
      fullname: `${item.user.firstName} ${item.user.lastName}`,
      email: item.user.email,
      ruangan: item.detailPeminjamanRuangan[0].ruangan,
      startHour: item.detailPeminjamanRuangan[0].startHour,
      endHour: item.detailPeminjamanRuangan[0].endHour,
      people: item.detailPeminjamanRuangan[0].people,
      necessity: item.detailPeminjamanRuangan[0].necessity,
    };
  });

  //   @ts-ignore
  const getEventsForDay = (date) => {
    return events?.filter((event) => isSameDay(event.date, date));
  };
  //   @ts-ignore
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return {
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    selectedItem,
    setSelectedItem,
    selectedRuangan,
    setSelectedRuangan,
    handlePreviousMonth,
    handleNextMonth,
    getDaysInMonth,
    getFirstDayOfMonth,
    getEventsForDay,
    isSameDay,
    events,
    getData,
    isLoading,
  };
};

export default useHomeFeature;
