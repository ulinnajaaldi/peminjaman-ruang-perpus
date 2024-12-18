"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { DialogForm } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { before } from "node:test";

const DialogForm: React.FC<DialogForm> = (props) => {
  const {
    mutate,
    mutateSapras,
    isLoadingSapras,
    dataSarpras,
    isPending,
    isPinjam,
    setIsPinjam,
    saranaSelected,
    setSaranaSelected,
    saranaForm,
    setSaranaForm,
    form,
    handleCheckKetersediaan,
    isPendingCheck,
    checkRuangan,
    setCheckRuangan,
  } = props;

  React.useEffect(() => {
    console.log(form.getValues("date"));
  }
  , [form.watch("date")]);

  return (
    <Dialog
      open={isPinjam}
      onOpenChange={(isOpen) => {
        setIsPinjam(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Proses peminjaman ruangan</DialogTitle>
          <DialogDescription>
            Silahkan isi form dibawah ini untuk meminjam ruangan
          </DialogDescription>
        </DialogHeader>
        {isPinjam && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((value) => {
                mutate(value);
              })}
            >
              <ScrollArea className="h-[70vh]">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col px-1">
                        <FormLabel>
                          Tanggal Peminjaman{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              onDayClick={() => {
                                setCheckRuangan(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col px-1">
                        <FormLabel>
                          Tanggal Peminjaman Akhir (jika lebih 1 hari peminjaman){" "}
                          {/* <span className="text-red-500">*</span> */}
                        </FormLabel>
                        <Popover >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                                // disabled={true}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={{
                                // const today = new Date();
                                // today.setHours(0, 0, 0, 0);
                                // return date < today;
                                before: form.getValues("date") ? form.getValues("date") : new Date()
                              }}
                              onDayClick={() => {
                                setCheckRuangan(false);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-5 px-1">
                    <FormField
                      control={form.control}
                      name="startHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Jam Mulai <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              min="08:00"
                              max="17:00"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endHour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Jam Selesai <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              min="08:00"
                              max="18:00"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>
                          Jumlah Orang <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="w-full"
                            min={1}
                            placeholder="eg: 10, 20, 30, dll"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="necessity"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>
                          Keperluan <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="eg: Rapat, Seminar, dll"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additional"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>
                          Informasi Tambahan{" "}
                          <span className="text-xs">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="eg: Kebutuhan meja, kursi, dll"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="letterLink"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>
                          Link Surat Peminjaman Ruangan{" "}
                          <span className="text-xs">
                            (optional *Pastikan surat bisa dilihat)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full"
                            placeholder="eg: https://drive.google.com/your-letter"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {saranaSelected.length > 0 && (
                    <div>
                      <FormLabel>Sarana dan Prasarana Tambahan</FormLabel>
                      <div className="flex flex-col gap-2">
                        {saranaSelected.map((sarana: any) => (
                          <div
                            key={sarana.id}
                            className="flex items-center justify-between gap-2 px-1"
                          >
                            <div className="flex items-center gap-2">
                              <Image
                                src={sarana.images || "/images/placeholder.jpg"}
                                alt={sarana.name}
                                width={50}
                                height={50}
                              />
                              <p className="text-xs sm:text-sm lg:text-base">
                                {sarana.name}
                              </p>
                            </div>
                            <div className="flex flex-1 items-center gap-2">
                              <Input
                                type="number"
                                placeholder="Jumlah yang dipinjam"
                                className="min-w-28 text-xs sm:text-sm lg:text-base"
                                min="1"
                                max={
                                  saranaSelected.find(
                                    (item: any) => item.id === sarana.id,
                                  ).ammount
                                }
                                value={
                                  saranaForm.find(
                                    (item: any) => item.idSapras === sarana.id,
                                  ).quantity
                                }
                                onChange={(e) => {
                                  setSaranaForm((prev: any) =>
                                    prev.map((item: any) =>
                                      item.idSapras === sarana.id
                                        ? {
                                            ...item,
                                            quantity: e.target.value,
                                          }
                                        : item,
                                    ),
                                  );
                                }}
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                  setSaranaSelected((prev: any) =>
                                    prev.filter((item: any) => item !== sarana),
                                  );
                                  setSaranaForm((prev: any) =>
                                    prev.filter(
                                      (item: any) =>
                                        item.idSapras !== sarana.id,
                                    ),
                                  );
                                }}
                              >
                                <X className={cn("h-4 w-4")} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="px-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => {
                            mutateSapras();
                          }}
                        >
                          Sarana dan Prasarana
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex flex-col gap-5 px-4 py-2">
                          {isLoadingSapras ? (
                            <div>Loading...</div>
                          ) : (
                            dataSarpras?.data?.map((sarpras: any) => (
                              <div
                                key={sarpras.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={sarpras.name}
                                  checked={
                                    saranaSelected.find(
                                      (item: any) => item.id === sarpras.id,
                                    ) !== undefined
                                  }
                                  disabled={
                                    saranaSelected.find(
                                      (item: any) => item.id === sarpras.id,
                                    ) !== undefined
                                  }
                                  onCheckedChange={() => {
                                    setSaranaSelected((prev: any) =>
                                      prev.includes(sarpras)
                                        ? prev.filter(
                                            (item: any) => item !== sarpras,
                                          )
                                        : [...prev, sarpras],
                                    );

                                    setSaranaForm((prev: any) =>
                                      prev.includes(sarpras)
                                        ? prev.filter(
                                            (item: any) => item !== sarpras,
                                          )
                                        : [
                                            ...prev,
                                            {
                                              idSapras: sarpras.id,
                                              quantity: "1",
                                            },
                                          ],
                                    );
                                  }}
                                />
                                <label htmlFor={sarpras.name}>
                                  {sarpras.name}
                                </label>
                                <p>({sarpras.ammount})</p>
                                <Image
                                  src={
                                    sarpras.images || "/images/placeholder.jpg"
                                  }
                                  alt={sarpras.name}
                                  width={50}
                                  height={50}
                                />
                              </div>
                            ))
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </ScrollArea>
              <div className="mt-4 flex items-center justify-between gap-3 px-1">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCheckKetersediaan}
                  className={`${checkRuangan ? "bg-green-500 hover:bg-green-500/80" : "bg-sky-500 hover:bg-sky-500/80"} text-white`}
                  disabled={
                    !form.getValues("date") ||
                    !form.getValues("startHour") ||
                    !form.getValues("endHour") ||
                    isPendingCheck
                  }
                >
                  Check Ketersediaan Ruangan
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || !checkRuangan}
                  className="w-full"
                >
                  Prosess
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
