import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../../components/Navigation";
import OpenMaps from "../../../components/OpenMaps";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaCarAlt, FaIdCard, FaSchool, FaUserAlt } from "react-icons/fa";
import {
  FaMapLocationDot,
  FaMapLocation,
  FaLocationDot,
} from "react-icons/fa6";
import axios from "axios";
import { RiRadioButtonFill } from "react-icons/ri";

const Dashboard = () => {
  const { idsiswa } = useParams();
  const [user, setUser] = useState(null);
  const [bus, setBus] = useState(null);
  const [sekolah, setSekolah] = useState(null); // New state variable for sekolah data
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the user data based on idsiswa from the API
  useEffect(() => {
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

  // Fetch the bus data from the API using the specific bus ID
  useEffect(() => {
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

  // Fetch the sekolah data using the sekolahId from the user data
  useEffect(() => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  if (!bus) {
    return <div>Bus not found.</div>;
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col overflow-auto bg-slate-100 sm:items-center sm:justify-center">
          <h1 className="flex w-screen flex-row items-center justify-center gap-2 bg-rose-500 p-2 text-xs font-medium text-white sm:text-base">
            <TbMoodKidFilled /> passager info :
          </h1>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <TbMoodKidFilled color="red" />
                Nama Siswa :
              </h1>
              <p className="text-xs font-medium sm:text-center">{user?.nama}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaSchool color="red" />
                Sekolah :
              </h1>
              <p className="text-xs font-medium sm:text-center">
                {sekolah?.nama}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaMapLocationDot color="red" />
                Pickup :
              </h1>
              <p className="w-56 text-xs font-medium sm:text-center">
                {bus?.streetName}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaMapLocation color="red" />
                Drop :
              </h1>
              <p className="w-56 text-xs font-medium sm:text-center">
                {bus?.streetName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-auto bg-slate-100 sm:items-center sm:justify-center">
          <h1 className="flex w-screen flex-row items-center justify-center gap-2 bg-rose-500 p-2 text-xs font-medium text-white sm:text-base">
            <FaUserAlt /> driver info :
          </h1>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaUserAlt color="red" />
                Name Supir :
              </h1>
              <p className="text-xs font-medium sm:text-center">
                {bus?.supir.nama}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaIdCard color="red" />
                Plat Kendaraan :
              </h1>
              <p className="text-xs font-medium sm:text-center">
                {bus?.nomorPolisi}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaCarAlt color="red" />
                Merek :
              </h1>
              <p className="text-xs font-medium sm:text-center">{bus?.merek}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <RiRadioButtonFill color="red" />
                Status :
              </h1>
              <p className="text-xs font-medium sm:text-center">
                {bus?.status}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaLocationDot color="red" />
                Posisi :
              </h1>
              <p className="w-56 text-xs font-medium sm:text-center">
                {bus?.position}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 p-2 sm:flex-col">
              <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                <FaLocationDot color="red" />
                Lokasi :
              </h1>
              <p className="w-56 text-xs font-medium sm:text-center">
                {bus?.streetName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-screen w-screen flex-col overflow-clip">
          <div>
            <OpenMaps />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
