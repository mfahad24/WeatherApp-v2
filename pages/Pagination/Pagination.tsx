import React, { ReactElement } from "react";

//styles
import styles from "../../styles/Pagination.module.css";

interface PaginationProps {
  weatherData: {
    length: Number;
  };
  currentPage: Number;
  setCurrentPage: Function;
}

const Pagination: React.FC<PaginationProps> = ({
  weatherData,
  setCurrentPage,
}): ReactElement => {
  return (
    <div
      className={`${styles.paginationContainer} ${
        weatherData?.length < 6 ? `${styles.hidden}` : ""
      }`}
    >
      <div className={styles.page}>
        <div
          className={`${styles.inactivePage} ${
            weatherData?.length >= 1 ? `${styles.activePage}` : ""
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </div>
      </div>
      <div className={styles.page}>
        <div
          className={`${styles.inactivePage} ${
            weatherData?.length > 5 ? `${styles.activePage}` : ""
          }`}
          onClick={() => weatherData?.length > 5 && setCurrentPage(2)}
        >
          2
        </div>
      </div>
      <div className={styles.page}>
        <div
          className={`${styles.inactivePage} ${
            weatherData?.length > 10 ? `${styles.activePage}` : ""
          }`}
          onClick={() => weatherData?.length > 10 && setCurrentPage(3)}
        >
          3
        </div>
      </div>
      <div className={styles.page}>
        <div
          className={`${styles.inactivePage} ${
            weatherData?.length > 15 ? `${styles.activePage}` : ""
          }`}
          onClick={() => weatherData?.length > 15 && setCurrentPage(4)}
        >
          4
        </div>
      </div>
    </div>
  );
};

export default Pagination;
