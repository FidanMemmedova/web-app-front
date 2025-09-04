import { useMemo } from "react";
import CityCard from "./CityCard";
import type { ForecastItem } from "../../Types/ForecastItem";
import style from "./CityCards.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  weatherData: ForecastItem[];
  searchTerm: string;
  hiddenCities: string[];
  setHiddenCities: React.Dispatch<React.SetStateAction<string[]>>;
}

const getCityNames = (weatherData: ForecastItem[]) =>
  Array.from(new Map(weatherData.map((item) => [item.city.name, item])).values());

const CityCards = ({ weatherData, searchTerm, hiddenCities, setHiddenCities }: Props) => {
  const cityNames = useMemo(() => getCityNames(weatherData), [weatherData]);
  const navigate = useNavigate();

  const toggleCityVisibility = (cityName: string) => {
    const updated = hiddenCities.includes(cityName)
      ? hiddenCities.filter(name => name !== cityName)
      : [...hiddenCities, cityName];

    setHiddenCities(updated);
    localStorage.setItem("hiddenCities", JSON.stringify(updated));
  };

  const filteredCities = useMemo(
    () =>
      cityNames.filter(
        (item) =>
          item.city.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
          !hiddenCities.includes(item.city.name)
      ),
    [cityNames, searchTerm, hiddenCities]
  );

  return (
    <div className={style.cityCards}>
      {filteredCities.map((item) => {
        const urlName = item.city.name.replace(/\s+/g, "");

        return (
          <div key={item.city.name} className={style.cityWrapper}>
            <CityCard
              imageSrc={item.city.picture}
              cityName={item.city.name}
              variant="home"
              onToggleVisibility={() => toggleCityVisibility(item.city.name)}
              isHidden={hiddenCities.includes(item.city.name)}
              onCardClick={() => navigate(`/city/${urlName}`)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CityCards;
