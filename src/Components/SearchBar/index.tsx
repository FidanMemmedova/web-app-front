import { useState, useEffect } from "react";
import style from "./SearchBar.module.scss";

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const trimmedValue = value.trim();
    const timeout = setTimeout(() => {
      onSearch(trimmedValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search for cities"
      className={style.searchBar}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
