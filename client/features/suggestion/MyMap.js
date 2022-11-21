import React, { useEffect} from "react";

export default function MyMap(props) {
  
  const { selectedRestaurants , longitude, latitude} = props;

  useEffect(() => {
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

    const container = document.getElementById("map-container");
    container.removeChild(container.firstElementChild);
    const newMap = document.createElement("div");
    newMap.setAttribute("id", "my-map");
    container.appendChild(newMap);

    if (latitude && selectedRestaurants) {
      const map = L.map(`my-map`).setView([latitude, longitude], 12);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
      }).addTo(map);

      const homeMarkerPopup = L.popup().setContent("Me");
      const homeMarker = L.marker([latitude, longitude], {
        icon: homeIcon,
      })
        .bindPopup(homeMarkerPopup)
        .addTo(map);

      selectedRestaurants.forEach((restaurant) => {
        if (
          restaurant.coordinates.latitude &&
          restaurant.coordinates.longitude
        ) {
          L.marker(
            [restaurant.coordinates.latitude, restaurant.coordinates.longitude],
            {
              icon: restaurantIcon,
            }
          )
            .bindPopup(L.popup().setContent(restaurant.name))
            .addTo(map);
        }
      });
    }

    if (!latitude && selectedRestaurants) {
      const map = L.map(`my-map`).setView([40.72393, -73.98383], 12);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
      }).addTo(map);

      selectedRestaurants.forEach((restaurant) => {
        if (
          restaurant.coordinates.latitude &&
          restaurant.coordinates.longitude
        ) {
          L.marker(
            [restaurant.coordinates.latitude, restaurant.coordinates.longitude],
            {
              icon: restaurantIcon,
            }
          )
            .bindPopup(L.popup().setContent(restaurant.name))
            .addTo(map);
        }
      });
    }
  }, [latitude,selectedRestaurants]);
  return (
    <div id="map-container">
      <div id="my-map"></div>
    </div>
  );
}
