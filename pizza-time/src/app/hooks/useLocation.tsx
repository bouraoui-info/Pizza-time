"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Location = {
  userLocation: { lat: number; lng: number };
  query: string;
  setQuery: () => any;
  setUserlocation: () => any;
  lat: number;
  lng: number;
};

export const UserLocationContext = createContext<Location | null>(null);
interface Props{
  [propsName:string]:any
}
export const UserLocationProvider = (props: any) => {
  const [userLocation, setUserlocation] = useState<{ lat: number; lng: number }[]>([]);
  const [query, setQuery] = useState("");

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserlocation((prevUserLocation) => ({
        ...prevUserLocation,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }));
    });
  };

  useEffect(() => {
    const askForLocationPermission = () => {
      getUserLocation();
    };
    if ("geolocation" in navigator) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            askForLocationPermission();
          } else if (result.state === "prompt") {
            askForLocationPermission();
          } else if (result.state === "denied") {
            toast.error("Location access denied by the user.", {
              duration: 1000,
            });
          }
        })
        .catch((error) => {
          console.error("Error checking location permission:", error);
        });
    } else {
      toast.error("Geolocation is not supported by this browser.", {
        duration: 1000,
      });
    }
  }, []);

  const value = {
    userLocation,
    query,
    setQuery,
    setUserlocation,
  };
  return <UserLocationContext.Provider value={value} {...props} />;
};

const useLocation = () => {
  const context = useContext(UserLocationContext);

  if (context === null) {
    throw new Error("useLocation must be used within a LocationContextProvider");
  }
  return context;
};

export default useLocation;
