import React, { useEffect, useState } from "react";
// import { key } from "../../../secrets";

export default function MyMap() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  useEffect(() => {
    getLocation();
    if (lat) {
      const map = L.map(`my-map`).setView([lat, long], 10);
      const myAPIKey = "8d42a004cb5648fc8229c2fdde3f272c";

      const isRetina = L.Browser.retina;

      const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
      const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

      L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        apiKey: "8d42a004cb5648fc8229c2fdde3f272c",
        maxZoom: 20,
        id: "osm-bright",
      }).addTo(map);

      const restaurantIcon = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=restaurant&apiKey=${myAPIKey}`,
        iconSize: [31, 46], // size of the icon
        iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
      });

      const homeIcon = L.icon({
        iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=red&icon=landmark&iconType=awesome&scaleFactor=2&apiKey=${myAPIKey}`,
        iconSize: [31, 46],
        iconAnchor: [15.5, 42],
        popupAnchor: [0, -45],
      });

      const homeMarkerPopup = L.popup().setContent("Me");
      const homeMarker = L.marker([lat, long], {
        icon: homeIcon,
      })
        .bindPopup(homeMarkerPopup)
        .addTo(map);

      const restaurantMarkerPopup = L.popup().setContent("Restaurant");
      const restaurantMarker = L.marker([40.69, -73.999], {
        icon: restaurantIcon,
      })
        .bindPopup(restaurantMarkerPopup)
        .addTo(map);
    }
  }, [lat]);
  return (
    <>
      <div id={`my-map`}></div>
    </>
  );
}
