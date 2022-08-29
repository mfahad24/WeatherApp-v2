import type { NextPage } from "next";
import Head from "next/head";
import WeatherSearch from "./WeatherSearch/WeatherSearch";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/weather.svg" />
      </Head>
      <WeatherSearch />
    </>
  );
};

export default Home;
