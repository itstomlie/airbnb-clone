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
  inputCoordinates?: string[];
  setCountry?: React.Dispatch<React.SetStateAction<string>>;
  setParentCoordinates?: React.Dispatch<React.SetStateAction<undefined>>;
}

const MapboxCountry: React.FC<MapboxCountryProps> = ({
  inputCoordinates,
  setCountry,
  setParentCoordinates,
}) => {
  const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoidG9tdGhlZGV2ZWxvcGVyMTEiLCJhIjoiY2wwMTFrMTBiMHB3MTNwcXBpZHl2eGZ1eSJ9.Vou5dmwCnq0bIIBYPasAeg",
  });
  const { countries } = useCountries();

  const [coordinates, setCoordinates] = useState(inputCoordinates);

  return (
    <>
      {setCountry && setParentCoordinates ? (
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
            <SelectContent className="md:h-[38vh] lg:h-[50vh]">
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
      ) : (
        <div></div>
      )}
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        className="w-[50vw] md:h-[52vh] lg:h-[60vh]"
        zoom={[3]}
        // @ts-ignore
        center={coordinates}
      />
    </>
  );
};

export default MapboxCountry;
