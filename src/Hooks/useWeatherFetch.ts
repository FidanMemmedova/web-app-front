import { useQuery } from "@tanstack/react-query";
import getWeatherData from "../Store/services/weatherService";
import type { ForecastItem } from "../Types/ForecastItem";

const useWeatherFetch = () => {
  const { data, error, isLoading, refetch } = useQuery<ForecastItem[], Error>({
    queryKey: ["weatherData"],
    queryFn: async () => {
      const result = await getWeatherData();
      result.sort((a, b) => {
        if (a.city.name === b.city.name) {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return a.city.name.localeCompare(b.city.name);
      });
      return result;
    },
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });

  return { data, isLoading, error: error?.message ?? null, refetch };
};

export default useWeatherFetch;
