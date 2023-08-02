import { FaBus, FaHistory, FaUserAlt } from "react-icons/fa";
import Navigation from "../../../components/Navigation";
import { historys } from "../../../data/Historys";
import { FaMapLocation, FaMapLocationDot } from "react-icons/fa6";

const HistoryPage = () => {
  const history = historys.find((history) => history.id === "1");
  // Fetch the drivers database with id as a key and define the drivers as driver.

  if (!history) {
    // Handle case when history is not found
    return null;
  }

  return (
    <>
      <div className="z-0 flex h-screen w-screen flex-row">
        <div className="absolute z-10">
          <Navigation />
        </div>
        <div className="ml-16 grid w-screen grid-cols-2 grid-rows-4 gap-2 bg-slate-100 px-2 py-2">
          {/* Tracking Map */}
          <div className="col-span-2 row-span-4 flex flex-col items-center border border-black bg-black  sm:overflow-clip sm:bg-slate-50">
            <h1 className="flex flex-row items-center justify-center gap-2 py-2 text-center text-sm font-bold text-white sm:w-full sm:bg-black sm:text-lg sm:text-white">
              <FaHistory /> History :
            </h1>
            <div className="h-full w-full overflow-auto bg-white p-2">
              <div className="w-full bg-white p-4 outline outline-1 outline-zinc-200">
                <div className=" flex flex-col gap-6">
                  {historys.map((history) => (
                    <div key={history.id}>
                      <ul className="flex flex-col gap-1 p-3 text-sm outline outline-1 outline-black">
                        <li>No. {history.id}</li>
                        <li className="mb-2 flex flex-col items-center gap-2 text-center text-base font-medium">
                          Tanggal : {history.date}
                        </li>
                        <p className="mb-4 text-center text-xs font-medium">
                          Lokasi :
                        </p>
                        <li className="mb-2 flex flex-col items-center justify-center gap-2 text-center">
                          <FaMapLocationDot />
                          Naik : {history.pickup}
                        </li>
                        <li className="mb-4 flex flex-col items-center justify-center gap-2 text-center">
                          <FaMapLocation />
                          Turun : {history.drop}
                        </li>
                        <p className="mb-4 text-center text-xs font-medium">
                          Kendaraan :
                        </p>
                        <li className="mb-2 flex flex-col items-center justify-center gap-2">
                          <FaUserAlt />
                          Supir : {history.driver}
                        </li>
                        <li className="mb-2 flex flex-col items-center justify-center gap-2">
                          <FaBus />
                          Plat Bus : {history.plat}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
