import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapApp = () => {
  const [busData, setBusData] = useState(null);

  useEffect(() => {
    // Fetch the specific bus with ID "clkqqwx5l0000vey09t1mk9o5"
    fetchBusData("clkqqwx5l0000vey09t1mk9o5");

    // Set interval to fetch the specific bus data every 5 seconds
    const interval = setInterval(
      () => fetchBusData("clkqqwx5l0000vey09t1mk9o5"),
      5000
    );

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchBusData = async (busId) => {
    try {
      const response = await axios.get(
        `http://tracking.ta-tmj.com/api/v1/bis/${busId}`
      );
      if (response.data.success) {
        setBusData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bus data:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center border border-black bg-black px-5 pb-10 sm:h-screen sm:w-screen">
      <h1 className="flex flex-row items-center justify-center gap-2 py-2 text-center text-sm font-bold text-white sm:w-full sm:bg-black sm:text-lg sm:text-white">
        Tracking Location :
      </h1>
      <div id="map" className="h-full w-full">
        <MapContainer
          center={
            busData?.position
              ? busData.position.split(",").map(Number)
              : [-6.366116, 106.820671]
          }
          zoom={28}
          style={{ height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {busData && (
            <Marker position={busData.position.split(",").map(Number)}>
              <Popup>
                <h2>Bus Details</h2>
                <p>
                  <strong>Bus ID:</strong> {busData.id}
                  <br />
                  <strong>License Plate:</strong> {busData.nomorPolisi}
                  <br />
                  <strong>Brand:</strong> {busData.merek}
                  <br />
                  <strong>Status:</strong> {busData.status}
                  <br />
                  {busData.supir && (
                    <>
                      <strong>Driver Name:</strong> {busData.supir.nama}
                      <br />
                      <strong>Driver Phone:</strong>{" "}
                      {busData.supir.nomorTelepon}
                      <br />
                      <strong>Driver Address:</strong> {busData.supir.alamat}
                      <br />
                    </>
                  )}
                  {busData.streetName && (
                    <>
                      <strong>Street Name:</strong> {busData.streetName}
                      <br />
                    </>
                  )}
                </p>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapApp;
