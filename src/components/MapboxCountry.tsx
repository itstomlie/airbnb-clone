"use client";

import React, { useState } from "react";

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// @ts-ignore
import { useCountries } from "use-react-countries";
import Image from "next/image";
import { MapPin } from "lucide-react";

type country = {
  name: string;
  capital: string;
  area: number;
  coordinates: number[];
  currencies: {
    name: string;
    symbol: string;
  }[];
  languages: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  postalCode: {
    format: string;
    regex: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  emoji: string;
  countryCallingCode: string;
};

interface MapboxCountryProps {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setParentCoordinates: React.Dispatch<React.SetStateAction<undefined>>;
}

const MapboxCountry: React.FC<MapboxCountryProps> = ({
  setCountry,
  setParentCoordinates,
}) => {
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoidG9tdGhlZGV2ZWxvcGVyMTEiLCJhIjoiY2wwMTFrMTBiMHB3MTNwcXBpZHl2eGZ1eSJ9.Vou5dmwCnq0bIIBYPasAeg",
  });
  const { countries } = useCountries();

  const [coordinates, setCoordinates] = useState([120.0, -0.5]);

  return (
    <>
      <div className="relative flex justify-center">
        <Select
          onValueChange={(value) => {
            setCountry(value);

            const coordinates = countries
              .find((item: country) => item.name === value)
              .coordinates.reverse();

            coordinates[1] += 4; // To lower the map because of the select bar

            setCoordinates(coordinates);
            setParentCoordinates(coordinates);
          }}
        >
          <SelectTrigger className="w-[80%] absolute z-20 mt-2">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="lg:h-[38vh] xl:h-[50vh]">
            {countries
              .sort((a: country, b: country) => a.name.localeCompare(b.name))
              .map((item: country) => (
                <SelectItem value={item.name} key={item.name}>
                  <div className="flex space-x-2">
                    <Image
                      src={item.flags.svg}
                      alt="flag"
                      width={20}
                      height={20}
                    />
                    <p>{item.name}</p>
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        className="w-[50vw] lg:h-[52vh] xl:h-[60vh]"
        zoom={[3]}
        // @ts-ignore
        center={coordinates}
      >
        <Marker coordinates={coordinates}>
          <div style={{ color: "red", fontSize: "20px" }}>
            &#x1f4cc; {/* Map Pin Emoji */}
          </div>
        </Marker>
        <Layer type="symbol" layout={{ "icon-image": "harbor-15" }}>
          <Feature coordinates={coordinates} />
        </Layer>
      </Map>
    </>
  );
};

export default MapboxCountry;
