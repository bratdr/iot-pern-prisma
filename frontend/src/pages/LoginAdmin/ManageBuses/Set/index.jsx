import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useBusContext } from "../busContext";

const SetSupir = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setNopol, setMerk } = useBusContext();

  const [selectedId, setSelectedId] = useState("");
  const [busData, setBusesData] = useState([]);

  const [driversData, setDriversData] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState("");

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(
          "http://tracking.ta-tmj.com/api/v1/bis"
        );
        setBusesData(response.data.data);
        setSelectedId(id);
      } catch (error) {
        console.log("Error fetching bus data:", error);
      }
    };

    fetchBusData();
  }, [id]);

  useEffect(() => {
    const selectedBus = busData.find((bus) => bus.id === selectedId);

    if (selectedBus) {
      setNopol(selectedBus.nomorPolisi);
      setMerk(selectedBus.merek);
    }
  }, [selectedId, busData]);

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const response = await axios.get(
          "http://tracking.ta-tmj.com/api/v1/supir"
        );
        setDriversData(response.data.data);
      } catch (error) {
        console.log("Error fetching drivers data:", error);
      }
    };

    fetchDriversData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        idBis: selectedId,
        idSupirBis: selectedDriverId,
      };

      await axios.patch(
        "http://tracking.ta-tmj.com/api/v1/bis/driver/set",
        requestBody
      );

      window.alert("Driver set successfully for the bus!");
      navigate("/admin/dashboard/buses");
    } catch (error) {
      console.log("Error setting driver for the bus:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">
          Ubah Supir Kendaraan
        </h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2">
            Select Bus:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select Bus --</option>
              {busData.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.merek} (ID: {bus.id})
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Select Driver:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
            >
              <option value="">-- Select Driver --</option>
              {driversData.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.nama} (ID: {driver.id})
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2">
            <button
              className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
              type="submit"
              disabled={!selectedId || !selectedDriverId}
            >
              Set Driver
            </button>
            <button
              onClick={() => navigate("/admin/dashboard/buses")}
              className="rounded bg-rose-500 p-3 text-base font-semibold text-white hover:bg-rose-600 hover:duration-300"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetSupir;
