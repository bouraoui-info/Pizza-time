"use client";

import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import useLocation from "@/app/hooks/useLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { card } from "../../constats";
import SearchInput from "../common/SearchInput";

type place =
  | {
      town: string;
      image: string;
      Nature: string;
      shopid: number;
      Address: string;
      Company: string;
      Country: string;
      PostalCode: string;
      latitude: number;
      longitude: number;
      Responsible: string;
      etat: string;
    }
  | undefined;
type CustomSize = {
  width: number;
  height: number;
  equals: (other: CustomSize) => boolean;
};
const Map = () => {
  const ContainerStyle = {
    width: "100%",
    height: "70vh",
  };
  const cordinate = { lat: 44.62072, lng: 4.39088 };
  const { userLocation, setUserlocation } = useLocation();
  console.log("locationx", userLocation);

  const customPinView: any = new L.Icon({
    icon: FaMapMarkerAlt, // Specify the path to your icon image
    iconSize: [50, 50],
    // Set the size of the icon
  });

  const postalCodes: string[] = Object.values(card.shoplist).map(
    (item: any) => item.PostalCode
  );
  console.log(postalCodes);
  0;
  const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
      return this.width === other.width && this.height === other.height;
    },
  };

  const [selectedPlace, setSelectedPlace] = useState<place>();
  console.log({ selectedPlace });
  const router = useRouter();

  return (
    <>
      {/* <Button small label="click" onClick={()=>{router.push(`/api/${postalCode}`)}}/> */}
      <div className="m-2">
        <div className="m-2">
          <SearchInput />
        </div>
        <LoadScript googleMapsApiKey="AIzaSyDEhl-uIJjF6FAC22WsVvQc_vor_HLPzhk">
          <GoogleMap
            mapContainerStyle={ContainerStyle}
            center={cordinate}
            zoom={4}
          >
            <MarkerF key="myLocation" position={userLocation} />

            {Object.values(card.shoplist).map((place: any) => (
              <MarkerF
                key={`${place.Address}-${place.Company}-${place.latitude}-${place.longitude}`}
                onClick={() => {
                  place === selectedPlace
                    ? setSelectedPlace(undefined)
                    : setSelectedPlace(place);
                }}
                icon={customPinView}
                position={{ lat: place.latitude, lng: place.longitude }}
              />
            ))}
            {selectedPlace && (
              <InfoWindowF
                position={{
                  lat: selectedPlace.latitude,
                  lng: selectedPlace.longitude,
                }}
                zIndex={1}
                options={{
                  pixelOffset: pixelOffset,
                }}
                onCloseClick={() => setSelectedPlace(undefined)}
              >
                <div>
                  <div
                    className="aspect-square overflow-hidden relative w-full rounded-md h-[200px]"
                    style={{ height: "20px" }}
                  >
                    <Image
                      fill
                      src={selectedPlace.image}
                      alt=""
                      onClick={() => {
                        router.push(`/components/Boutiques`);
                      }}
                    />
                  </div>

                  <h3>{selectedPlace.Company}</h3>
                  <div className=" text-[15px] flex gap-1 ">
                    <div>{selectedPlace.Address},</div>
                    <div>{selectedPlace.PostalCode}</div>
                    <div>{selectedPlace.town}</div>
                  </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  );
};

export default Map;