import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { countries } from "countries-list";
import { Select } from "./ui/select";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.MAPBOX_ACCESS_TOKEN!;

export default function MapWithGeocoder() {
  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    mapInstanceRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID
      center: [106.827925, -6.176353], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    mapInstanceRef.current?.on("load", () => {
      setMapLoaded(true);
    });
  }, []);

  return (
    <>
      <div className="relative flex justify-center">
        <div className="absolute z-20 w-[80%] rounded-full mt-5">
          <SearchBox
            options={{
              country: "ID",
            }}
            accessToken={accessToken}
            map={mapInstanceRef.current}
            mapboxgl={mapboxgl}
            value={inputValue}
            onChange={(d) => {
              setInputValue(d);
            }}
            marker
          />
        </div>
      </div>
      <div id="map-container" ref={mapContainerRef} style={{ height: 300 }} />;
    </>
  );
}
