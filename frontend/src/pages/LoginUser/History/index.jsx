import axios from "axios";

import Navigation from "../../../components/Navigation";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FaHistory, FaIdCard, FaSchool } from "react-icons/fa";
import { FaMapLocationDot, FaMapLocation } from "react-icons/fa6";

const HistoryPage = () => {
  const { idsiswa } = useParams();
  const [user, setUser] = useState(null);
  const [bus, setBus] = useState(null);
  const [sekolah, setSekolah] = useState(null);
  const [commuteData, setCommuteData] = useState(null); // New state variable for commute data
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the user data based on idsiswa from the API
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://tracking.ta-tmj.com/api/v1/siswa/${idsiswa}`
        );
        const success = userResponse.data?.success;
        const userData = userResponse.data?.data;

        if (success && userData) {
          setUser(userData);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [idsiswa]);

  useEffect(() => {
    // Fetch the bus data from the API using the specific bus ID
    const fetchBusData = async () => {
      try {
        const busId = "clkqqwx5l0000vey09t1mk9o5"; // Replace this with the actual bus ID from the API response or any other method to obtain the specific bus ID
        const busResponse = await axios.get(
          `http://tracking.ta-tmj.com/api/v1/bis/${busId}`
        );
        const success = busResponse.data?.success;
        const busData = busResponse.data?.data;

        if (success && busData) {
          setBus(busData);
        } else {
          console.error("Failed to fetch bus data.");
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusData();
  }, []);

  useEffect(() => {
    // Fetch the sekolah data using the sekolahId from the user data
    const fetchSekolahData = async () => {
      try {
        const sekolahId = user?.sekolahId;
        console.log("sekolahId:", sekolahId);

        if (!sekolahId) {
          console.error("Sekolah ID not found.");
          return;
        }

        const sekolahResponse = await axios.get(
          "http://tracking.ta-tmj.com/api/v1/sekolah"
        );

        const success = sekolahResponse.data?.success;
        const sekolahData = sekolahResponse.data?.data;

        if (success && sekolahData && sekolahData.length > 0) {
          const foundSekolah = sekolahData.find(
            (sekolah) => sekolah.id === sekolahId
          );

          if (foundSekolah) {
            setSekolah(foundSekolah);
          } else {
            console.error("Sekolah not found in the API response.");
          }
        } else {
          console.error("Failed to fetch sekolah data.");
        }
      } catch (error) {
        console.error("Error fetching sekolah data:", error);
      }
    };

    if (user?.sekolahId) {
      fetchSekolahData();
    }
  }, [user?.sekolahId]);

  useEffect(() => {
    // Fetch the commute data using the nisn value from the user data
    const fetchCommuteData = async () => {
      try {
        const nisn = user?.nisn;
        console.log("nisn:", nisn);

        if (!nisn) {
          console.error("NISN not found.");
          return;
        }

        const commuteResponse = await axios.get(
          `http://tracking.ta-tmj.com/api/v1/commute/cari-siswa?nisn=${nisn}`
        );

        console.log("commuteResponse:", commuteResponse.data);

        const success = commuteResponse.data?.success;
        const commuteData = commuteResponse.data?.data;

        console.log("commuteData:", commuteData);

        if (success && commuteData && commuteData.length > 0) {
          // Sort the Commuter List data based on the updatedAt field in descending order
          const sortedData = commuteData.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          // Reverse the array to get the newest data first
          const newestCommuteData = sortedData.reverse();

          setCommuteData(newestCommuteData); // Set the entire array of history data
        } else {
          console.error("Failed to fetch commute data.");
          setCommuteData([]); // Set an empty array to indicate no history data available
        }
      } catch (error) {
        console.error("Error fetching commute data:", error);
        setCommuteData([]); // Set an empty array to indicate no history data available
      }
    };

    if (user?.nisn) {
      fetchCommuteData();
    }
  }, [user?.nisn]);

  if (isLoading || !commuteData) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(commuteData)) {
    return <div>No history data available.</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  if (!bus) {
    return <div>Bus not found.</div>;
  }

  return (
    <>
      <div className="w-min-screen h-screen">
        <Navigation />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 overflow-auto bg-slate-100 ">
            <h1 className="flex w-screen flex-row items-center justify-center gap-2 bg-sky-500 p-2 text-xs font-medium text-white sm:text-base">
              <FaHistory /> History :
            </h1>

            <h1 className="text-center text-base font-semibold">
              Commute Siswa History: {user.nama}
            </h1>

            {commuteData.map((commute, index) => (
              <div
                key={commute.id}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-96 bg-white">
                  <div className="flex flex-row items-center p-2 sm:flex-col">
                    <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold "></h1>
                    <p className="w-56 text-sm font-bold sm:text-center">
                      Data No. {index + 1 || "Not available"}
                    </p>
                  </div>

                  <div className="flex flex-row items-center p-2 sm:flex-col">
                    <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-medium ">
                      <FaIdCard color="red" />
                      ID Commute:
                    </h1>
                    <p className="w-56 text-xs font-medium sm:text-center">
                      {commute.id || "Not available"}
                    </p>
                  </div>

                  <div className="flex flex-row items-center p-2 sm:flex-col">
                    <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-medium ">
                      <FaMapLocation color="red" />
                      Posisi Naik:
                    </h1>
                    <p className="w-56 text-xs font-medium sm:text-center">
                      {commute.startPosition || "Not available"}
                    </p>
                  </div>

                  <div className="flex flex-row items-center p-2 sm:flex-col">
                    <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-medium ">
                      <FaMapLocationDot color="red" />
                      Posisi Turun:
                    </h1>
                    <p className="w-56 text-xs font-medium sm:text-center">
                      {commute.finishPosition || "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
