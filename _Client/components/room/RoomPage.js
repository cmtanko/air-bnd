import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Pagination, Typography } from "@mui/material";

import { RoomCard } from "./RoomCard";
import { useRouter } from "next/router";
import { ProductListToolbar } from "./RoomListToolbar";
import Map from "../Map";

const RoomPage = () => {
  const router = useRouter();

  let { page = 1, location = "" } = router.query;
  page = Number(page);
  const {
    rooms,
    roomsCount,
    filteredRoomsCount = 1,
    resPerPage = 6,
    error = ""
  } = useSelector((state) => state.allRooms);

  useEffect(() => {
    error && toast.error(error);
  }, [rooms]);

  const handleChangePage = (event, newPage) => {
    router.push(`/rooms?page=${newPage}`);
  };

  let count = Math.ceil(roomsCount / resPerPage);
  if (location) {
    count = Math.ceil(filteredRoomsCount / resPerPage);
  }

  return (
    <div>
      <Typography sx={{ mt: 1 }} variant="h4">
        Great holiday rentals {location ? "in" : ""} {location}
      </Typography>
      <main className="flex">
        <section className="flex">
          <div className="">
            {rooms &&
              rooms.map((room) => <RoomCard key={room._id} product={room} />)}
            <Pagination
              className="flex justify-center pt-4 pb-4"
              color="primary"
              page={page}
              count={count}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </div>
        </section>
        <section className="hidden lg:inline-flex pl-2">
          {rooms && rooms.length>0 && <Map rooms={rooms} />}
        </section>
      </main>
    </div>
  );
};

export default RoomPage;
