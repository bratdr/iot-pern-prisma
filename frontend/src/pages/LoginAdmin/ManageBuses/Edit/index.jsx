import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBuses = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //Default State agar Data bisa Kosong sebelum memilih
  const [selectedId, setSelectedId] = useState("");
  const [busData, setBusesData] = useState([]);
  const [nomorPolisi, setNopol] = useState("");
  const [merk, setMerk] = useState("");

  // Fetching bis data dari api
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic

    try {
      await axios.patch("http://tracking.ta-tmj.com/api/v1/bis", {
        id: selectedId,
        nomorPolisi,
        merk,
      });

      window.alert("Buses data updated successfully!");
      navigate("/admin/dashboard/buses");
    } catch (error) {
      console.log("Error updating bus data:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">Ubah Data Kendaraan</h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2">
            Select Bus ID:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select ID --</option>
              {busData.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.id}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Nopol
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Masukan Nomor Polisi"
              value={nomorPolisi}
              onChange={(e) => setNopol(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Merk
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Masukan Merek Kendaraan"
              value={merk}
              onChange={(e) => setMerk(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-2">
            <button
              className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
              type="submit"
              disabled={!selectedId}
            >
              Update
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

export default EditBuses;
