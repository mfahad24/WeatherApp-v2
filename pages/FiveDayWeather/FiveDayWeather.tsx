import React, { ReactElement } from "react";

//constants
import { weatherIconBaseUrl } from "../../constants/constants";

//utils
import { convertDate } from "../../utils/conversions";

//styles
import styles from "../../styles/FiveDayWeather.module.css";

interface FiveDayWeatherProps {
  weatherData: {
    pageGroup: Number;
    list: object;
    city: {
      name: string;
    };
  }[];
  currentPage: Number;
  setDetailedWeather: Function;
  setViewDetailedWeather: Function;
  setClickedDay: Function;
}

const FiveDayWeather: React.FC<FiveDayWeatherProps> = ({
  weatherData,
  currentPage,
  setDetailedWeather,
  setViewDetailedWeather,
  setClickedDay,
}): ReactElement => {
  return (
    <>
      {weatherData?.map((weather) => {
        if (weather.pageGroup === currentPage) {
          return (
            <>
              <div className={styles.result}>
                <div className={styles.title}>{weather.city.name}</div>
                {/* @ts-ignore */}
                {weather?.list?.map(
                  (item: {
                    dt_txt: string;
                    dt: number;
                    weather: {
                      description: string | undefined;
                      icon: string;
                    }[];
                    main: { temp: number };
                  }) => {
                    if (item.dt_txt.slice(11, 16) === "15:00") {
                      return (
                        <li
                          className={styles.list}
                          key={item.dt}
                          onClick={() => {
                            setDetailedWeather(weather);
                            setViewDetailedWeather(true);
                            setClickedDay(item.dt_txt.slice(0, 10));
                          }}
                        >
                          <div className={styles.dateContainer}>
                            <div className={styles.date}>
                              {convertDate(item.dt_txt.slice(0, 10))}
                            </div>
                          </div>
                          <div className={styles.icon}>
                            <img
                              className={styles.image}
                              alt={item.weather[0].description}
                              src={`${weatherIconBaseUrl}${item.weather[0].icon}.png`}
                            />
                          </div>
                          <div className={styles.temperature}>
                            {Math.round(item.main.temp)}°
                          </div>
                        </li>
                      );
                    }
                  }
                )}
              </div>
            </>
          );
        } else {
          return;
        }
      })}
    </>
  );
};

export default FiveDayWeather;
