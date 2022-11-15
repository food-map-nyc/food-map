import React, { useEffect, useState } from "react";

export default function MyMap(props) {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const { selectedRestaurants } = props;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation();

    const restaurantIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      iconSize: [31, 46], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    });

    const homeIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      iconSize: [31, 46],
      iconAnchor: [15.5, 42],
      popupAnchor: [0, -45],
    });

    if (lat) {
      const container = document.getElementById("map-container");
      container.removeChild(container.firstElementChild);
      const newMap = document.createElement("div");
      newMap.setAttribute("id", "my-map");
      container.appendChild(newMap);

      const map = L.map(`my-map`).setView([lat, long], 10);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
      }).addTo(map);

      const homeMarkerPopup = L.popup().setContent("Me");
      const homeMarker = L.marker([lat, long], {
        icon: homeIcon,
      })
        .bindPopup(homeMarkerPopup)
        .addTo(map);

      selectedRestaurants.forEach((restaurant) => {
        if (restaurant.latitude && restaurant.longitude) {
          L.marker([restaurant.latitude, restaurant.longitude], {
            icon: restaurantIcon,
          })
            .bindPopup(L.popup().setContent(restaurant.dba))
            .addTo(map);
        }
      });
    } else {
      const map = L.map(`my-map`).setView([40.7896239, -73.9598939], 10);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
      }).addTo(map);

      selectedRestaurants.forEach((restaurant) => {
        if (restaurant.latitude && restaurant.longitude) {
          L.marker([restaurant.latitude, restaurant.longitude], {
            icon: restaurantIcon,
          })
            .bindPopup(L.popup().setContent(restaurant.dba))
            .addTo(map);
        }
      });
    }
  }, [lat]);
  return (
    <div id="map-container">
      <div id="my-map"></div>
    </div>
  );
}
