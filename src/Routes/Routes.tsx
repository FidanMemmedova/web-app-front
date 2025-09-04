import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CityDetails from "../Pages/Details";
import HiddenCities from "../Pages/HiddenCities";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/city/:cityName",
        element: <CityDetails />, 
      },
      {
        path: "/hidden",
        element: <HiddenCities />
      },
      {
        path: "*", 
        element: <NotFound/>,
      }
    ],
  },
]);
