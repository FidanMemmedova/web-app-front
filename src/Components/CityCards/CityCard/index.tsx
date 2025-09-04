import { formatDateTime, translateToCelcius } from "../../../Helpers/helpers";
import type { ForecastItem } from "../../../Types/ForecastItem";
import style from "./CityCard.module.scss";
import cloudyImg from "../../../Assets/images/cloudy.png";
import sunnyImg from "../../../Assets/images/sunny.png";
import snowyImg from "../../../Assets/images/snowy.png";

interface ICityCardProps {
  imageSrc?: string;
  cityName?: string;
  time?: string;
  temperature?: number;
  tempType?: ForecastItem["tempType"];
  variant?: "home" | "details";
  onToggleVisibility?: () => void;
  isHidden?: boolean;
  onCardClick?: () => void;
}

const CityCard = ({
  imageSrc,
  cityName,
  time,
  temperature,
  tempType,
  variant = "home",
  onToggleVisibility,
  isHidden = false,
  onCardClick,
}: ICityCardProps) => {
  let weatherIcon: string | null = null;
  if (variant === "details" && temperature !== undefined && tempType) {
    const tempC = translateToCelcius(temperature, tempType);
    if (tempC < 0) weatherIcon = snowyImg;
    else if (tempC < 25) weatherIcon = cloudyImg;
    else weatherIcon = sunnyImg;
  }

  const handleCardClick = () => {
    if (onCardClick) onCardClick();
  };

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (onToggleVisibility) onToggleVisibility();
  };

  return (
    <div
      className={`${style.cityCard} ${style[variant]}`}
      onClick={handleCardClick}
    >
      <div className={style.cityInfo}>
        {imageSrc && <img className={style.cityImage} src={imageSrc} alt={cityName || "City"} />}
        {cityName && <p className={style.cityName}>{cityName}</p>}
      </div>

      {variant === "details" && (
        <div className={style.detailsInfo}>
          {time && <p className={style.cityTime}>{formatDateTime(time)}</p>}
          {weatherIcon && <img className={style.weatherIcon} src={weatherIcon} alt="Weather icon" />}
          {temperature !== undefined && tempType && (
            <p className={style.cityTemp}>{translateToCelcius(temperature, tempType).toFixed()}°</p>
          )}
        </div>
      )}

      {variant === "home" && (
        <div className={style.homeInfo}>
          {temperature !== undefined && tempType && (
            <p className={style.cityTemp}>{translateToCelcius(temperature, tempType).toFixed()}°</p>
          )}
          {onToggleVisibility && (
            <button
              className={style.hideButton}
              onClick={handleToggleClick}
            >
              {isHidden ? "Unhide" : "Hide"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CityCard;
