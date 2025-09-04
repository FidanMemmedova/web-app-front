import type { ForecastItem } from "../Types/ForecastItem";

export const translateToCelcius = (
  value: number,
  tempType: ForecastItem["tempType"]
): number => {
  switch (tempType) {
    case "C":
      return value;
    case "F":
      return Math.round(((value - 32) * 5) / 9);
    case "K":
      return Math.round(value - 273.15);
    default:
      return value;
  }
};

export const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
