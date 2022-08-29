import React, { ReactElement } from "react";

//constants
import { weatherIconBaseUrl } from "../../constants/constants";

//utils
import { convertTime, convertDate } from "../../utils/conversions";

//styles
import styles from "../../styles/DetailedWeather.module.css";

interface DetailedWeatherProps {
  detailedWeather: {
    list: object;
    city: {
      name: string;
    };
  };
  setViewDetailedWeather: Function;
  clickedDay: String;
}

const DetailedWeather: React.FC<DetailedWeatherProps> = ({
  detailedWeather,
  setViewDetailedWeather,
  clickedDay,
}): ReactElement => {
  //@ts-ignore
  const selectedDayOnly = detailedWeather?.list.filter(
    (li: { dt_txt: string; li: string }) => {
      return li.dt_txt.slice(0, 10) === clickedDay;
    }
  );

  return (
    <div className={styles.container}>
      <div
        className={styles.close}
        onClick={() => setViewDetailedWeather(false)}
      >
        close
      </div>
      <div className={styles.header}>
        <div className={styles.clickedDay}>{convertDate(clickedDay)}</div>
        <div className={styles.city}>{detailedWeather?.city.name}</div>
      </div>
      {selectedDayOnly?.map(
        (item: { main: any; weather: any; dt_txt: string }) => {
          return (
            <>
              <div className={styles.singleDayDetails}>
                <div className={styles.dateContainer}>
                  {convertTime(item.dt_txt.slice(11, item.dt_txt.length - 3))}
                </div>
                <div className={styles.description}>{item.weather[0].main}</div>
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
              </div>
            </>
          );
        }
      )}
    </div>
  );
};

export default DetailedWeather;
