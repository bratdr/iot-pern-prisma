import React, { useEffect, useState, useRef } from "react";
import { FaBus } from "react-icons/fa";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapApp = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [boundingBox, setBoundingBox] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Set bounding box for a specific region (Example: New York City)
    setBoundingBox({
      minLat: 40.4774,
      maxLat: 40.9176,
      minLon: -74.2591,
      maxLon: -73.7004,
    });
  }, []);

  useEffect(() => {
    if (!boundingBox) return;

    // Initialize the map after boundingBox is set
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 13);

      // Add the OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }

    // Function to generate random coordinates within a 10-meter radius from the initial coordinates
    // Function to generate random coordinates within a 500-meter radius from the initial coordinates
    const getRandomCoordinates = () => {
      const lat = -6.366204;
      const lon = 106.820784;
      const radiusInMeters = 500;

      // Convert the radius to degrees
      const radiusInDegrees = radiusInMeters / 111320; // Approximate 1 degree of latitude in meters

      // Generate random offsets in latitude and longitude
      const latOffset = Math.random() * radiusInDegrees;
      const lonOffset = Math.random() * radiusInDegrees;

      // Calculate the new latitude and longitude
      const newLat = lat + latOffset;
      const newLon = lon + lonOffset;

      return [newLat, newLon];
    };

    // Fill the map with markers at random coordinates within the 500-meter radius
    const fillMapWithMarkers = () => {
      for (let i = 0; i < 10; i++) {
        const randomCoordinates = getRandomCoordinates();
        L.marker(randomCoordinates).addTo(mapRef.current);
      }
    };

    fillMapWithMarkers();

    // Function to track user's coordinates
    const trackCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);

            // Set the map view to the user's location
            mapRef.current.setView([latitude, longitude], 13);

            // Add a marker at the user's location
            if (!userLocation) {
              L.marker([latitude, longitude]).addTo(mapRef.current);
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
  }, [boundingBox, userLocation]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div id="map" className="h-2/3 w-3/6"></div>
    </div>
  );
};

export default MapApp;
