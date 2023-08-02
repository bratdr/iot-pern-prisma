import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDriver = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedId, setSelectedId] = useState("");
  const [driverData, setDriverData] = useState([]);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get("http://tracking.ta-tmj.com/api/v1/supir");
        setDriverData(response.data.data);
        setSelectedId(id);
      } catch (error) {
        console.log("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, [id]);

  useEffect(() => {
    const selectedDriver = driverData.find(
      (driver) => driver.id === selectedId
    );

    if (selectedDriver) {
      setNama(selectedDriver.nama);
      setAlamat(selectedDriver.alamat);
      setNomorTelepon(selectedDriver.nomorTelepon);
    }
  }, [selectedId, driverData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch("http://tracking.ta-tmj.com/api/v1/supir", {
        id: selectedId,
        nama,
        alamat,
        nomorTelepon,
      });

      window.alert("Driver data updated successfully!");
      navigate("/admin/dashboard/driver");
    } catch (error) {
      console.log("Error updating driver data:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">Edit Data Supir</h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleFormSubmit}
        >
          <label className="flex flex-col gap-2">
            Select Driver ID:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select ID --</option>
              {driverData.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.id}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Nama Supir
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the driver name"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            No. Telp
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="0821-XXXX-XXXX"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Alamat
            <input
              className="mb-4 rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the driver address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
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
              onClick={() => navigate("/admin/dashboard/driver")}
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

export default EditDriver;
