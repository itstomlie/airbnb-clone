"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Reservation = {
  id: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  listingId: string | null;
  userId: string | null;
};

const Reservation = ({ user, reservations, price }: any) => {
  const { pending } = useFormStatus();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservations.forEach((reservation: Reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  const pathname = usePathname();

  return (
    <div className="md:p-5 md:shadow-xl md:rounded-lg md:sticky md:top-24 overflow-y-auto">
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />

      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection as any])}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
        weekStartsOn={1}
        className="w-full"
        //@ts-ignore
        style={{ width: "100%" }}
      />

      <div className="flex justify-between space-x-10 items-center">
        <p className="text-nowrap">
          <span className="font-medium text-lg">${price}</span> night
        </p>
        {user?.id ? (
          <Button className="w-full" type="submit">
            {pending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Make a reservation"
            )}
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link href={`${pathname}/?modal=true`}>
              {pending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Make a reservation"
              )}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Reservation;
