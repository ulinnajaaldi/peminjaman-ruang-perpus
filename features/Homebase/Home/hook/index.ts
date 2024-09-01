import { IProsesPinjamAllSchema } from "@/domain/ProsesPinjam";
import { axiosInstanceToken } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { log } from "console";
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
        }&ruanganId=${selectedRuangan}&status=Disetujui`,
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

  // const events = getData?.map((item) => {
  //   return {
  //     id: item.id,
  //     date: new Date(item.detailPeminjamanRuangan[0].date),
  //     endDate: item.detailPeminjamanRuangan[0].endDate && new Date(item.detailPeminjamanRuangan[0].endDate) || undefined,
  //     title: item.user.firstName,
  //     fullname: `${item.user.firstName} ${item.user.lastName}`,
  //     email: item.user.email,
  //     ruangan: item.detailPeminjamanRuangan[0].ruangan,
  //     startHour: item.detailPeminjamanRuangan[0].startHour,
  //     endHour: item.detailPeminjamanRuangan[0].endHour,
  //     people: item.detailPeminjamanRuangan[0].people,
  //     necessity: item.detailPeminjamanRuangan[0].necessity,
  //   };
  // });

  const listEvents = () => {
    const eventsArray: any[] = [];
  
    getData?.forEach((item) => {
      const { detailPeminjamanRuangan, user } = item;
      const { date, endDate, ruangan, startHour, endHour, people, necessity } = detailPeminjamanRuangan[0];
  
      let startDate = new Date(date);
      let endData = endDate ? new Date(endDate) : null;
  
      const generateEvent = (eventDate: Date) => ({
        id: item.id,
        date: new Date(eventDate), // clone the date to avoid reference issues
        endDate: endData ? new Date(endData) : undefined,
        title: user.firstName,
        fullname: `${user.firstName} ${user.lastName}`,
        email: user.email,
        ruangan,
        startHour,
        endHour,
        people,
        necessity,
      });
  
      // Generate events for each day within the range
      if (endData) {
        while (startDate <= endData) {
          eventsArray.push(generateEvent(startDate));
          startDate.setDate(startDate.getDate() + 1);
        }
      } else {
        eventsArray.push(generateEvent(startDate));
      }
    });
  
    return eventsArray;
  };

  //   @ts-ignore
  const getEventsForDay = (date) => {
    return listEvents()?.filter((event) => isSameDay(event.date, date));
    // return events?.filter((event) => isSameDay(event.date, date));
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
    // events,
    listEvents,
    getData,
    isLoading,
  };
};

export default useHomeFeature;
