import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../_Client/components/dashboard-layout";
import { getRoomDetails } from "../../_Client/redux/actions/roomsAction";
import { wrapper } from "../../_Client/redux/store";
import RoomDetailsPage from "../../_Client/components/room/RoomDetailsPage";

const RoomDetails = () => (
  <>
    <Head>
      <title>Hotels | Air-bnd</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <RoomDetailsPage />
    </Box>
  </>
);

RoomDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RoomDetails;

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, params }) => {
    // const session = await getSession({ req });
    // if (!session) {
    //   return {
    //     redirect: {
    //       destination: "/login",
    //       permanent: false
    //     }
    //   };
    // }

    await store.dispatch(getRoomDetails(req, params.id));
  };
});
