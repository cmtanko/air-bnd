import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../_Client/components/dashboard-layout";
import { getRooms } from "../../_Client/redux/actions/roomsAction";
import { wrapper } from "../../_Client/redux/store";
import RoomPage from "../../_Client/components/room/RoomPage";
import { getSession } from "next-auth/client";
import MyBookings from "../../_Client/components/booking/MyBookingPage";
import Header from "../../_Client/components/Header";
const MyBookingPage = () => (
  <>
    <Head>
      <title>Hotels | Air-bnd</title>
    </Head>
    <Header />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <MyBookings />
    </Box>
  </>
);

MyBookingPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MyBookingPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, query }) => {
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }
  };
});
