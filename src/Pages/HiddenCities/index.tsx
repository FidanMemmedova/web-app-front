import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import useWeatherFetch from "../../Hooks/useWeatherFetch";
import style from "./HiddenCities.module.scss";
import CityCard from "../../Components/CityCards/CityCard";
import Loader from "../../Components/Loader";
import RetryBtn from "../../Components/RetryBtn";

const HiddenCities = () => {
  const { data: weatherData, isLoading, error, refetch } = useWeatherFetch();
  const navigate = useNavigate(); 

  const [hiddenCities, setHiddenCities] = useState<string[]>(() => {
    const stored = localStorage.getItem("hiddenCities");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("hiddenCities", JSON.stringify(hiddenCities));
  }, [hiddenCities]);

  const toggleCityVisibility = (cityName: string) => {
    setHiddenCities((prev) => prev.filter((name) => name !== cityName));
  };

  const uniqueHiddenCities = useMemo(() => {
    if (!weatherData) return [];
    const map = new Map<string, typeof weatherData[0]>();
    weatherData.forEach((item) => {
      if (hiddenCities.includes(item.city.name) && !map.has(item.city.name)) {
        map.set(item.city.name, item);
      }
    });
    return Array.from(map.values());
  }, [weatherData, hiddenCities]);

  if (isLoading) return <Loader />;
  if (error) return <RetryBtn onRetry={() => refetch()} message={error} />;

  return (
    <div className={style.hiddenCitiesWrapper}>
      {uniqueHiddenCities.length === 0 ? (
        <p className={style.noHiddenText}>No hidden cities</p>
      ) : (
        uniqueHiddenCities.map((item) => (
          <CityCard
            key={item.city.name}
            cityName={item.city.name}
            imageSrc={item.city.picture}
            variant="home"
            onToggleVisibility={() => toggleCityVisibility(item.city.name)}
            isHidden={true}
          />
        ))
      )}

      <div className={style.backHomeWrapper}>
        <button
          className={style.backHomeButton}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default HiddenCities;
