import Head from "next/head";

import { wrapper } from "../../_Client/redux/store";
import Header from "../../_Client/components/Header";
import Banner from "../../_Client/components/Banner";
import Footer from "../../_Client/components/Footer";
import RoomPage from "../../_Client/components/room/RoomPage";
import { getRooms } from "../../_Client/redux/actions/roomsAction";
import { DashboardLayout } from "../../_Client/components/dashboard-layout";
import { useRouter } from "next/router";
import { format } from "date-fns";

const Products = () => {
  const router = useRouter();
  const { location, startDate, endDate, guests } = router.query;
  const formattedStartDate =
    startDate && format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = endDate && format(new Date(endDate), "dd MMMM yy");

  const range = `${formattedStartDate} - ${formattedEndDate}`;
  const placeholderString = startDate && `${location} | ${range} | ${guests}` || "";
  return (
    <>
      <Head>
        <title>Hotels | Air-bnd</title>
      </Head>
      <Header placeholder={placeholderString}></Header>

      <main className="">
        <section className="pt-16 px-10">
          <p className="text-xs">
            300+ Stays - {range} - {guests} guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in Mars</h1>

          <div className="hidden md:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
          <RoomPage />
        </section>
      </main>
      <Footer />
    </>
  );
};

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
