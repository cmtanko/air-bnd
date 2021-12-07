import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { RoomCard } from "./RoomCard";
import { ProductListToolbar } from "./RoomListToolbar";
import { useRouter } from "next/router";

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
    router.push(`/?page=${newPage}`);
  };

  let count = Math.ceil(roomsCount / resPerPage);
  if (location) {
    count = Math.ceil(filteredRoomsCount / resPerPage);
  }

  return (
    <Container maxWidth={false}>
      <ProductListToolbar />
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {rooms &&
            rooms.map((room) => (
              <Grid item key={room._id} lg={4} md={6} xs={12}>
                <RoomCard product={room} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3
        }}
      >
        <Pagination
          color="primary"
          page={page}
          count={count}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default RoomPage;