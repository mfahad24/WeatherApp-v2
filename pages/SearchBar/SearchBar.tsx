import React, { ReactElement } from "react";

//styles
import styles from "../../styles/SearchBar.module.css";

interface SearchBarProps {
  handleSearchInputValue: Function;
  handleEnterKeyPress: Function;
  queryParam: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearchInputValue,
  handleEnterKeyPress,
  queryParam,
}): ReactElement => {
  return (
    <div className={styles.searchInputContainer}>
      <input
        data-testid="search-input-container"
        type="text"
        className={styles.searchInput}
        placeholder="Type in a city and press enter"
        onChange={(event) => handleSearchInputValue(event)}
        onKeyPress={(event) => handleEnterKeyPress(event)}
        value={queryParam}
      ></input>
      <div className={styles.searchButtonContainer}></div>
    </div>
  );
};

export default SearchBar;
