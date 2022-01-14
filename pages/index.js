import Head from "next/head";

import { wrapper } from "../_Client/redux/store";
import Footer from "../_Client/components/Footer";
import Header from "../_Client/components/Header";
import Banner from "../_Client/components/Banner";
import RoomPage from "../_Client/components/room/RoomPage";
import CityCard from "../_Client/components/city/CityCard";
import { getRooms } from "../_Client/redux/actions/roomsAction";
import CityMediumCard from "../_Client/components/city/CityMediumCard";
import { DashboardLayout } from "../_Client/components/dashboard-layout";

const Products = ({ cardData, exploreData }) => (
  <>
    <Head>
      <title>
        Airbnd: Holiday Rentals, Cabins, Beach Houses, Unique Homes &amp;
        Experiences
      </title>
    </Head>
    <Header></Header>
    <Banner></Banner>
    <main className="max-w-7xl mx-auto px-8 sm:px-16">
      <section className="pt-6">
        <h2 className="text-4xl pb-5 font-semibold">Explore Nearby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData.map(({ img, distance, location }) => {
            return (
              <CityCard
                key={location}
                img={img}
                distance={distance}
                location={location}
              />
            );
          })}
        </div>
      </section>

      <section className="pt-6">
        <h2 className="text-4xl py-8 font-semibold">Live Anywhere</h2>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
          {cardData.map(({ img, title }) => {
            return <CityMediumCard key={title} img={img} title={title} />;
          })}
        </div>
      </section>
    </main>

    <Footer />
  </>
);

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      cardData,
      exploreData
    }
  };
}
