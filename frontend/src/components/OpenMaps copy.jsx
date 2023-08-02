import React, { useEffect, useState, useRef } from "react";
import { FaBus } from "react-icons/fa";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapApp = () => {
  const [userLocation, setUserLocation] = useState({});
  const mapRef = useRef(null);

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location details:", error);
      return null;
    }
  };

  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([-6.366204, 106.820784], 16); // Set initial view to your specific coordinates

      // Add the OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }

    // Function to add a marker with address popup to the map
    const addMarkerToMap = async (latitude, longitude) => {
      // Fetch location details using the Postman API
      const locationDetails = await fetchLocationDetails(latitude, longitude);

      if (locationDetails) {
        setUserLocation({
          latitude,
          longitude,
          address: locationDetails.display_name,
        });

        // Add a marker with a popup showing the address at the specific coordinates
        const popupContent = `<b>${locationDetails.display_name}</b>`;
        L.marker([latitude, longitude])
          .addTo(mapRef.current)
          .bindPopup(popupContent)
          .openPopup();
      }
    };

    // Fetch location details for your specific coordinates and add a marker to the map
    addMarkerToMap(-6.366204, 106.820784);

    // Function to track user's coordinates
    const trackCoordinates = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Fetch location details using the Postman API
            const locationDetails = await fetchLocationDetails(
              latitude,
              longitude
            );

            if (locationDetails) {
              setUserLocation({
                latitude,
                longitude,
                address: locationDetails.display_name,
              });

              // Set the map view to the user's location
              mapRef.current.setView([latitude, longitude], 13);

              // Add a marker with a popup showing the address at the user's location
              const popupContent = `<b>${locationDetails.display_name}</b>`;
              L.marker([latitude, longitude])
                .addTo(mapRef.current)
                .bindPopup(popupContent)
                .openPopup();
            }
          },
          (error) => {
            console.error("Error tracking coordinates:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    trackCoordinates();
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center border border-black bg-black px-5 pb-10 sm:h-screen sm:w-screen">
      <h1 className="flex flex-row items-center justify-center gap-2 py-2 text-center text-sm font-bold text-white sm:w-full sm:bg-black sm:text-lg sm:text-white">
        Tracking Location :
      </h1>
      <div id="map" className="h-full w-full"></div>
    </div>
  );
};

export default MapApp;
