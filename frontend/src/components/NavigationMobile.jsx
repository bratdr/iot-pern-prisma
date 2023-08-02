import axios from "axios";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { data_dashboard } from "../data/Dashboard";
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { TbMoodKidFilled } from "react-icons/tb";

const Navigation = () => {
  const { idsiswa } = useParams();
  const [user, setUser] = useState(null);
  const [bus, setBus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

    fetchUserData();
    fetchBusData();
  }, [idsiswa]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Handle case when user is not found
    return <div>User not found.</div>;
  }

  if (!bus) {
    // Handle case when bus is not found
    return <div>Bus not found.</div>;
  }

  return (
    <>
      <div>
        <section className="flex gap-2">
          <div
            className={`min-h-screen overflow-clip border border-y-0 border-l-0 border-black bg-[#000] ${
              open ? "w-72 bg-opacity-95 sm:w-80" : "w-16"
            } px-4 text-gray-100 duration-1000`}
          >
            <div className="relative mt-4 flex flex-col gap-4">
              <Link
                className="group flex items-center gap-3.5 rounded-md p-2 text-sm font-medium text-white hover:bg-slate-100 hover:text-rose-600"
                onClick={() => setOpen(!open)}
              >
                <FaLocationDot size={22} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Navigation;
