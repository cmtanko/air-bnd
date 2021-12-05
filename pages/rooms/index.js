import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { DashboardLayout } from "../../_Client/components/dashboard-layout";
import { getRooms } from "../../_Client/redux/actions/roomsAction";
import { wrapper } from "../../_Client/redux/store";
import RoomPage from "../../_Client/components/room/RoomPage";

const Products = () => (
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
      <RoomPage />
    </Box>
  </>
);

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async ({ req, query }) => {
    // const session = await getSession({ req });
    // if (!session) {
    //   return {
    //     redirect: {
    //       destination: "/login",
    //       permanent: false
    //     }
    //   };
    // }

    await store.dispatch(getRooms(req, query.page, query.location));
  };
});
