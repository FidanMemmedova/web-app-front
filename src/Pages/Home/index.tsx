import { useState, useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import useWeatherFetch from "../../Hooks/useWeatherFetch";
import CityCards from "../../Components/CityCards";
import ShowHiddenCitiesBtn from "../../Components/ShowHiddenCitiesBtn";
import Loader from "../../Components/Loader";
import RetryBtn from "../../Components/RetryBtn";
import style from "./Home.module.scss";

const Home = () => {
  const { data: weatherData, isLoading, error, refetch } = useWeatherFetch();
  const [searchTerm, setSearchTerm] = useState("");
  const [hiddenCities, setHiddenCities] = useState<string[]>(() => {
    const stored = localStorage.getItem("hiddenCities");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("hiddenCities", JSON.stringify(hiddenCities));
  }, [hiddenCities]);

  const handleRefresh = async () => {
    if (!navigator.onLine) {
      alert("You are offline. Cannot refresh data.");
      return;
    }
    await refetch();
  };

  if (!navigator.onLine && (!weatherData || weatherData.length === 0)) {
    return <div className={style.status}>You are offline. No cached data available.</div>;
  }

  if (isLoading) return <Loader />;
  if (error) return <RetryBtn onRetry={handleRefresh} message={error} />;

  return (
    <div className={style.homeWrapper}>
      <div className={style.topBar}>
        <div className={style.searchBarWrapper}>
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <button className={style.refreshButton} onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <CityCards
        weatherData={weatherData || []}
        searchTerm={searchTerm}
        hiddenCities={hiddenCities}
        setHiddenCities={setHiddenCities}
      />
      <ShowHiddenCitiesBtn hiddenCount={hiddenCities.length} />
    </div>
  );
};

export default Home;
