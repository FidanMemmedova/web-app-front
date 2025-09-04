export type ForecastItem = {
    date: string;
    city: {
        name: string;
        picture: string;
    };
    tempType: "C" | "F" | "K";
    temp: number;
};