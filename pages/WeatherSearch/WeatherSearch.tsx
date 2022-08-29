import React, { ReactElement, useState } from "react";

//components
import SearchBar from "../SearchBar/SearchBar";
import FiveDayWeather from "../FiveDayWeather/FiveDayWeather";
import Pagination from "../Pagination/Pagination";
import DetailedWeather from "../DetailedWeather/DetailedWeather";

//constants
import {
  specialCharacters,
  enterCityWithoutSpecialCharacters,
  noNetworkConnection,
  forecast,
  enter,
  baseUrl,
  notAValidCity,
  allOtherErrors,
  apiKey,
} from "../../constants/constants";

//styles
import styles from "../../styles/WeatherSearch.module.css";

const WeatherSearch: React.FC = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [queryParam, setQueryParam] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedWeather, setDetailedWeather] = useState<any>([]);
  const [viewDetailedWeather, setViewDetailedWeather] = useState(false);
  const [clickedDay, setClickedDay] = useState("");

  const identifyValue = (length: Number) => {
    if (length <= 5) return 1;
    if (length <= 10) return 2;
    if (length <= 15) return 3;
    if (length <= 20) return 4;
  };

  const handleSearchInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let queryParam = event.target.value;
    //edge case #1 - if user enters special characters, alert them
    if (
      //@ts-ignore
      queryParam !== "" ||
      //.test checks if user query includes any of the special characters
      !specialCharacters.test(queryParam)
    ) {
      setQueryParam(event.target.value);
    } else {
      alert(enterCityWithoutSpecialCharacters);
      setQueryParam("");
    }
  };

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //check if user is connected to the internet
    if (!navigator.onLine) {
      alert(noNetworkConnection);
    } else if (navigator.onLine && event.key === enter && queryParam != "") {
      fetchWeather(forecast);
      //resets input value after state is updated, thus clearing input field
      setQueryParam("");
    }
  };

  const fetchWeather = (endpoint: String) => {
    const url = `${baseUrl}${endpoint}?q=${queryParam}&units=imperial&appid=${apiKey}`;

    fetch(url)
      .then((response) => {
        //edge case #2 - checks if queryParam is a valid city; if invalid, API will send 404
        if (response.ok) {
          //we're looking for 200 status codes
          return response.json();
        } else if (response.statusText === "Not Found") {
          //API documentation is not clear in the case that the response returns a 404
          //I am assuming that the city does not exist
          alert(notAValidCity);
        } else {
          //sending an alert for all other response error codes
          alert(`${allOtherErrors}${response.statusText}`);
        }
      })
      .then((data) => {
        if (typeof data === "object") {
          setWeatherData((prevData: any) => [
            ...prevData,
            Object.defineProperty(data, "pageGroup", {
              value: identifyValue(prevData.length + 1),
            }),
          ]);
        } else {
          return;
        }
      });
  };

  return (
    <div className={styles.container}>
      <SearchBar
        handleSearchInputValue={handleSearchInputValue}
        handleEnterKeyPress={handleEnterKeyPress}
        queryParam={queryParam}
      />
      {!viewDetailedWeather && (
        <>
          <FiveDayWeather
            weatherData={weatherData}
            currentPage={currentPage}
            setDetailedWeather={setDetailedWeather}
            setViewDetailedWeather={setViewDetailedWeather}
            setClickedDay={setClickedDay}
          />
          <Pagination
            weatherData={weatherData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {viewDetailedWeather && (
        <DetailedWeather
          detailedWeather={detailedWeather}
          setViewDetailedWeather={setViewDetailedWeather}
          clickedDay={clickedDay}
        />
      )}
    </div>
  );
};

export default WeatherSearch;
