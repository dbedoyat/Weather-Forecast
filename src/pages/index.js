import React from "react";
import Head from "next/head";
import Image from "next/image";
import Lottie from "lottie-react";
import Weather from "../components/Weather";
import IconWeather from "../../public/lottie/weather.json";
import { GetDay } from "../utils/getDay";
import NightLottie from "../../public/lottie/night.json";
import DayLottie from "../../public/lottie/day.json";

import styles from "@/styles/Home.module.scss";

const Home = () => {
  const [data, setData] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const isDayorNight = GetDay();
  const FetchAddress = async () => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const geocode = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=4&format=json`;
    try {
      const getAddress = await fetch(proxy + geocode).then((res) => res.json());
      const latlng = `${getAddress?.result?.addressMatches[0]?.coordinates?.y},${getAddress?.result?.addressMatches[0]?.coordinates?.x}`;
      const initialData = await fetch(
        `https://api.weather.gov/points/${latlng}`
      ).then((res) => res.json());
      const forecastData = await fetch(initialData?.properties?.forecast).then(
        (res) => res.json()
      );
      setData({ initialData, forecastData });
    } catch (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
      return "Address not valid, Please add another address";
    }
  };
  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div className="Home">
      <Head>
        {data ? (
          <title>
            {data?.initialData?.properties?.relativeLocation?.properties?.city}{" "}
            - Weather Forecast
          </title>
        ) : (
          <title>Weather Forecast</title>
        )}
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {data && (
        <div className="current">
          <picture className={styles.bgweather}>
            <Image
              src={data?.forecastData?.properties?.periods[0]?.icon}
              alt={data?.forecastData?.properties?.periods[0]?.name}
              fill={true}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </picture>
        </div>
      )}
      <main className={styles.main}>
        {isDayorNight ? (
          <Lottie animationData={NightLottie} loop={true} />
        ) : (
          <Lottie animationData={DayLottie} loop={true} />
        )}

        <div className={styles.form}>
          <input
            type="text"
            placeholder="One Line Address here"
            className="form-control"
            onChange={handleInputChange}
            name="One line Address"
          ></input>
          <button type="submit" onClick={FetchAddress}>
            Search
          </button>
        </div>
        <Weather data={data} />
      </main>
    </div>
  );
};
export default Home;
