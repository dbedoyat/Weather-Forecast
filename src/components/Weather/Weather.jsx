import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Weather.module.scss";

const Weather = ({ data }) => {
  const details = data && data?.forecastData?.properties?.periods;
  const info = data && data?.initialData?.properties;
  if (details)
    return (
      <div>
        <div className={styles.info}>
          <p>
            Search for a random address{" "}
            <Link
              href="https://ca.postcodebase.com/randomaddress"
              target="_blank"
              className="link"
            >
              here
            </Link>
          </p>
        </div>
        <h1 className={styles.heading}>
          {info?.relativeLocation?.properties?.city}{" "}
        </h1>
        <div className={styles.grid}>
          {details &&
            details
              .filter((node) => node.isDaytime)
              .map((node) => {
                return (
                  <div className={styles.card} key={node.number}>
                    <picture className={styles.blurrybg}>
                      <Image
                        src={node.icon}
                        alt={node.name}
                        fill={true}
                        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                      />
                    </picture>

                    <div className={styles.content}>
                      <Image
                        src={node.icon}
                        alt={node.name}
                        width={64}
                        height={64}
                      />
                      <h2>
                        {node.temperature}°{node.temperatureUnit} <br />
                        <span>
                          {Math.round(((~~node.temperature - 32) * 50) / 9) /
                            10}
                          °C
                        </span>
                      </h2>
                      <h3>{node.name} </h3>

                      <p>{node.shortForecast}</p>
                      <p></p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    );
  else
    return (
      <div className={styles.info}>
        <p>
          Search for a random address{" "}
          <Link
            href="https://ca.postcodebase.com/randomaddress"
            target="_blank"
            className="link"
          >
            here
          </Link>
        </p>
      </div>
    );
};
export default Weather;
