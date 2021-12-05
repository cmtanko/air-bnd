import React, { useEffect } from "react";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Box, Container, Grid, Pagination } from "@mui/material";

import { RoomCard } from "./RoomCard";
import { ProductListToolbar } from "./RoomListToolbar";

const RoomPage = () => {
  const { rooms, error="" } = useSelector((state) => state.allRooms);

  useEffect(() => {
    error && toast.error(error);
  }, []);

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
        <Pagination color="primary" count={3} size="small" />
      </Box>
    </Container>
  );
};

export default RoomPage;
