import axios from "axios";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Navigation = () => {
  const { idsiswa } = useParams();
  const [user, setUser] = useState(null);
  const [bus, setBus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

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

  const navigateToHistory = () => {
    navigate(`/user/dashboard/history/${idsiswa}`);
  };

  const navigateToDashboard = () => {
    navigate(`/user/dashboard/${idsiswa}`);
  };

  return (
    <>
      <div>
        <section className="flex w-screen items-center justify-center gap-2 bg-white py-3 sm:justify-between sm:px-6 ">
          <div className="flex flex-row gap-2 sm:gap-4 ">
            <div className="relative flex flex-col gap-4">
              <button
                className="group flex items-center gap-3.5 rounded-md bg-slate-100 p-2 text-sm font-medium text-black hover:text-rose-600"
                onClick={navigateToDashboard}
              >
                <FaLocationDot className="text-rose-600" size={22} />
                <p className="text-xs font-semibold sm:text-base">
                  Tracking Position
                </p>
              </button>
            </div>
            <div className="relative flex flex-col gap-4">
              <button
                onClick={navigateToHistory}
                className="group flex items-center gap-3.5 rounded-md bg-slate-100 p-2 text-sm font-medium text-black hover:text-rose-600"
              >
                <FaHistory className="text-sky-600" size={22} />
                <p className="text-xs font-semibold sm:text-base">History</p>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col gap-4">
            <Link
              to={"/"}
              className="group flex items-center gap-3.5 rounded-md bg-slate-100 p-2 text-sm font-medium text-black hover:text-rose-600"
            >
              <BiLogOut size={22} />
              <p className="text-xs font-semibold sm:text-base">Logout</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Navigation;
