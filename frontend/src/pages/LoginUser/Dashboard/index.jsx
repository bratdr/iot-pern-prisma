import Navigation from "../../../components/Navigation";
import mapsIMG from "../../../assets/Union.png";
import { buses } from "../../../data/Buses";
import { users } from "../../../data/Users";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaAddressCard, FaSchool, FaUserAlt } from "react-icons/fa";
import {
  FaMapLocationDot,
  FaMapLocation,
  FaLocationDot,
} from "react-icons/fa6";

const Dashboard = () => {
  const bus = buses.find((bus) => bus.id === "1");
  // Fetch the buses database with id as a key and define the users as bus.
  const user = users.find((user) => user.id === "1");
  // Fetch the users database with id as a key and define the users as user.

  if (!bus) {
    // Handle case when driver is not found
    return null;
  }

  if (!user) {
    // Handle case when user is not found
    return null;
  }
  return (
    <>
      <div className="z-0 flex h-screen w-screen flex-row">
        <div className="absolute z-10">
          <Navigation />
        </div>
        <div className="ml-16 grid w-screen grid-cols-2 grid-rows-4 gap-2 bg-slate-100 px-2 py-2 sm:grid-cols-4">
          {/* Tracking Map */}
          <div className="col-span-2 row-span-2 flex flex-col items-center border border-black bg-black sm:col-span-3 sm:col-start-2 sm:row-span-4 sm:row-start-1 sm:justify-start sm:gap-6 sm:overflow-clip sm:bg-slate-50">
            <h1 className="flex flex-row items-center justify-center gap-2 py-2 text-center text-sm font-bold text-white sm:w-full sm:bg-black sm:text-lg sm:text-white">
              <FaLocationDot /> Tracking Location :
            </h1>
            <img
              className="h-full w-fit object-cover sm:mt-6 sm:h-5/6 sm:w-auto sm:rounded-xl sm:border sm:border-black sm:object-cover"
              src={mapsIMG}
              alt="maps"
            />
          </div>
          {/* Passagers Info */}
          <div className="col-span-2 row-start-3 flex flex-col overflow-auto border border-black bg-slate-50 sm:col-auto sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:overflow-clip sm:bg-white">
            <h1 className="flex flex-row items-center justify-center gap-2 bg-black p-2 text-xs font-medium text-white sm:text-base">
              <TbMoodKidFilled /> passager info :
            </h1>
            <div className="flex flex-col gap-4 px-4 pt-2 sm:pt-4">
              <div className="flex flex-row items-center gap-6 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <TbMoodKidFilled color="red" />
                  Name :
                </h1>
                <p className="text-xs font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaSchool color="red" />
                  School :
                </h1>
                <p className="text-xs font-medium">{user.school}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaMapLocationDot color="red" />
                  Pickup Point :
                </h1>
                <p className="text-xs font-medium">{bus.pickup}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaMapLocation color="red" />
                  Drop Point :
                </h1>
                <p className="text-xs font-medium">{bus.drop}</p>
              </div>
            </div>
          </div>
          {/* Driver Info */}
          <div className="col-span-2 row-start-4 flex flex-col overflow-auto border border-black bg-slate-50 sm:col-auto sm:row-span-2 sm:row-start-3 sm:overflow-clip sm:bg-white">
            <h1 className="flex flex-row items-center justify-center gap-2 bg-black p-2 text-xs font-medium text-white sm:text-base">
              <FaUserAlt /> driver info :
            </h1>
            <div className="flex flex-col gap-4 px-4 pt-4">
              <div className="flex flex-row items-center gap-6 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <TbMoodKidFilled color="red" />
                  Name :
                </h1>
                <p className="text-xs font-medium">{bus.driver}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaSchool color="red" />
                  Buses :
                </h1>
                <p className="text-xs font-medium">{bus.nopol}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 ">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaAddressCard color="red" />
                  Start Location :
                </h1>
                <p className="text-xs font-medium">{bus.pickup}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 ">
              <div className="flex flex-row items-center gap-4 bg-white p-2 shadow-sm">
                <h1 className="flex flex-row items-center justify-center gap-2 text-sm font-bold ">
                  <FaAddressCard color="red" />
                  End Location :
                </h1>
                <p className="text-xs font-medium">{bus.drop}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
