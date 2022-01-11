import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../_Client/components/dashboard-layout";
import { getBookingDetails } from "../../_Client/redux/actions/bookingAction";
import { wrapper } from "../../_Client/redux/store";
import BookingDetails from "../../_Client/components/booking/BookingDetails";
import { getSession } from "next-auth/client";
import Header from "../../_Client/components/Header";
const BookingsDetailPage = () => (
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
      <BookingDetails />
    </Box>
  </>
);

BookingsDetailPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default BookingsDetailPage;

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, params }) => {
    const session = await getSession({ req });
    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }

    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id));
  };
});
