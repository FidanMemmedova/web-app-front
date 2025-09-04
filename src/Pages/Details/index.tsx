import { useParams, useNavigate } from "react-router-dom";
import useWeatherFetch from "../../Hooks/useWeatherFetch";
import CityCard from "../../Components/CityCards/CityCard";
import RetryBtn from "../../Components/RetryBtn";
import Loader from "../../Components/Loader";
import type { ForecastItem } from "../../Types/ForecastItem";
import style from "./Details.module.scss";

const CityDetails = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const { data: weatherData, isLoading, error, refetch } = useWeatherFetch();

  if (!navigator.onLine && (!weatherData || weatherData.length === 0)) {
    return <div className={style.status}>You are offline. No cached data available.</div>;
  }

  if (isLoading) return <Loader />;
  if (error) return <RetryBtn onRetry={() => refetch()} message={error} />;
  if (!weatherData || weatherData.length === 0) return <div className={style.status}>No data found</div>;

  const cityForecast = weatherData.filter(
    (item: ForecastItem) =>
      item.city.name.replace(/\s+/g, "").toLowerCase() === cityName?.toLowerCase()
  );

  if (!cityForecast.length) {
    return (
      <div className={style.status}>
        <p>No forecast found for this city.</p>
        <button className={style.goHomeBtn} onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className={style.title}>{cityForecast[0].city.name} Forecast</h2>
      <div className={style.detailsContainer}>
        {cityForecast.map((item: ForecastItem) => (
          <CityCard
            key={item.date}
            time={item.date}
            temperature={item.temp}
            tempType={item.tempType}
            variant="details"
          />
        ))}
      </div>
    </div>
  );
};

export default CityDetails;
