"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { IRuanganSchema } from "@/domain/Ruangan";
import { useMediaQuery } from "@/hook/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useHomeFeature from "../hook";

interface ICalendarInformationProps {
  ruangan?: IRuanganSchema[];
}

const CalendarInformation: React.FC<ICalendarInformationProps> = (props) => {
  const { ruangan } = props;

  const {
    currentDate,
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
    isLoading,
  } = useHomeFeature();

  const isDekstop = useMediaQuery("(min-width: 768px)");

  return (
    <main className="container mb-40 flex h-full w-full flex-col gap-4 lg:flex-row lg:gap-0">
      <div className="flex-1 bg-background px-6 pt-6">
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold lg:text-2xl">
              {currentDate.toLocaleString("id-ID", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handlePreviousMonth}>
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleNextMonth}>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <p className="col-span-7 text-sm lg:text-base">
              Filter berdasarkan ruangan
            </p>
            <Select
              value={selectedRuangan}
              onValueChange={(value) => {
                if (value === null) {
                  setSelectedRuangan("");
                } else {
                  setSelectedRuangan(value);
                  setSelectedItem([]);
                  setSelectedDate(null);
                }
              }}
            >
              <SelectTrigger className="col-span-5">
                <SelectValue placeholder="Pilih Ruangan.." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Ruangan</SelectLabel>
                  <SelectItem value={null as any}>Semua Ruangan</SelectItem>
                  {ruangan?.map((item) => (
                    <SelectItem key={item.id} value={item.id || ""}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <div className="h-72 w-full animate-pulse rounded-sm bg-gray-200" />
        ) : (
          <div className="grid grid-cols-7 gap-4">
            <div className="text-center font-semibold">
              {!isDekstop ? "A" : "Ahad"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "S" : "Senin"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "S" : "Selasa"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "R" : "Rabu"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "K" : "Kamis"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "J" : "Jumat"}
            </div>
            <div className="text-center font-semibold">
              {!isDekstop ? "S" : "Sabtu"}
            </div>
            {Array.from({
              length: getFirstDayOfMonth(
                currentDate.getFullYear(),
                currentDate.getMonth(),
              ),
            }).map((_, i) => (
              <div key={i} className="text-center text-muted-foreground" />
            ))}
            {Array.from({
              length: getDaysInMonth(
                currentDate.getFullYear(),
                currentDate.getMonth(),
              ),
            }).map((_, i) => {
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                i + 1,
              );
              const hasEvents = getEventsForDay(date)?.length > 0;
              return (
                <Button
                  key={i}
                  variant={
                    hasEvents
                      ? "default"
                      : selectedDate?.getDate() === date.getDate()
                        ? "default"
                        : "ghost"
                  }
                  onClick={() => {
                    if (selectedDate?.getDate() !== date.getDate()) {
                      setSelectedDate(date);
                      setSelectedItem(
                        getEventsForDay(date)?.map((event) => {
                          return {
                            id: event.id,
                            date: event.date,
                            title: event.title,
                            fullname: event.fullname,
                            email: event.email,
                            ruangan: event.ruangan,
                            startHour: event.startHour,
                            endHour: event.endHour,
                            people: event.people,
                            necessity: event.necessity,
                          };
                        }),
                      );
                    }
                  }}
                >
                  <div className={`p-2 ${hasEvents ? "font-semibold" : ""}`}>
                    {date.getDate()}
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="w-80 animate-pulse rounded-sm bg-gray-200 p-6">
          <div className="mb-6 h-10 rounded-sm bg-gray-300 text-2xl font-semibold"></div>
          <div className="h-8 rounded-sm bg-gray-300 p-4"></div>
        </div>
      ) : (
        <aside className="w-full bg-muted p-6 lg:w-80">
          <div className="mb-6 text-xl font-semibold lg:text-2xl">Jadwal</div>
          <div className="space-y-4">
            {selectedItem.length === 0 ? (
              <div className="text-xs text-muted-foreground lg:text-sm">
                Tidak ada jadwal
              </div>
            ) : (
              selectedItem?.map((item: any) => (
                <div key={item.id} className="rounded-lg bg-background p-4">
                  <div className="text-lg font-semibold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.fullname}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.email}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.ruangan}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.startHour} - {item.endHour}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.people}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.necessity}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      )}
    </main>
  );
};

export default CalendarInformation;
