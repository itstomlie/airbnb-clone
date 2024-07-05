"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = ({ coordinates }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidG9tdGhlZGV2ZWxvcGVyMTEiLCJhIjoiY2wwMTFrMTBiMHB3MTNwcXBpZHl2eGZ1eSJ9.Vou5dmwCnq0bIIBYPasAeg";

    mapRef.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 7,
    });

    mapRef.current.scrollZoom.disable();

    new mapboxgl.Marker().setLngLat(coordinates).addTo(mapRef.current);
  }, []);

  return (
    <div
      id="map"
      ref={mapContainerRef}
      className="w-full h-full min-h-32"
    ></div>
  );
};

export default MapboxExample;
