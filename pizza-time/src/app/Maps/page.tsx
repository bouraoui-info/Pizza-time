
"use client";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import useLocation from "@/app/hooks/useLocation";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { card } from "../../constats";
import { setId } from "../store"
import Container from "../common/Container";
import {MenuData} from "../../Data/menu-data"; 

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
  const navigateToOtherPage = (id: number) => {
    setId(id);
    localStorage.setItem("shopid", id.toString());
    var jsonString = JSON.stringify(card[id]);

    // Sample Json data 

    var jsonData = {
      workflow: card[id].workflow,
      categories: card[id].categories,
      items: card[id].items,
      place: card[id].place
    };

    // Convert JSON Data to string

    var jsonString = JSON.stringify(jsonData);

    // Save JSON String to local storage

    localStorage.setItem("card", jsonString);
    router.push("common/boutique");
  };
  const ContainerStyle = {
    width: "50%",
    height: "20vh",
   

  };
  const cordinate = { lat: 44.62072, lng: 4.39088 };
  const { userLocation } = useLocation();

  

  const customPinView: any = new L.Icon({
    icon: FaMapMarkerAlt,
    iconSize: [50, 50],

  });

  const postalCodes: string[] = Object.values(card.shoplist).map((item: any) => item.PostalCode);
  const pixelOffset: CustomSize = {
    width: 0,
    height: 0,
    equals: function (other: CustomSize): boolean {
      return this.width === other.width && this.height === other.height;
    },
  };

  const [selectedPlace, setSelectedPlace] = useState<place>();
  const router = useRouter();

  return (
    <Container>
      <div className="m-2">
        <LoadScript googleMapsApiKey="AIzaSyCew3EPYmeItz0-Rc9y4D31UCH7nlPFKzA">
          <GoogleMap
            mapContainerStyle={ContainerStyle}
            center={cordinate}
            zoom={4}
          >
            <MarkerF
              key="myLocation"
              icon={customPinView}
              position={userLocation}
               />

            {Object.values(card.shoplist).map((place: any) => (
              <MarkerF
                key={`${place.Address}-${place.Company}-${place.latitude}-${place.longitude}`}
                onClick={() => {
                  place === selectedPlace ? setSelectedPlace(undefined) : setSelectedPlace(place);
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
                        let id=""; 
                        for (let item of Object.keys(MenuData)){
                          if (
                            JSON.stringify(MenuData as any) ===
                            JSON.stringify(selectedPlace)
                          ){
                            id = item;
                          }
                        }

                        router.push(`/common/boutique`);
                        
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
    </Container>
  );
};

export default Map;
