import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBuses = () => {
  const navigate = useNavigate();
  const [nopol, setNopol] = useState("");
  const [merek, setMerk] = useState("");
  // const [driver, setDriver] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic

    await axios.post("http://tracking.ta-tmj.com/api/v1/bis", {
      nomorPolisi: nopol,
      merk: merek,
    });

    // Reset form values
    setNopol("");
    setMerk("");
    // setDriver("");

    // Clear file input
    if (formRef.current) {
      formRef.current.reset();
    }

    // Show alert window
    window.alert("Form submitted successfully!");

    navigate("/admin/dashboard/buses");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">
          Tambah Data Kendaraan
        </h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="flex flex-col gap-2">
            Nopol
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Masukan Nomor Polisi Kendaraan"
              value={nopol}
              onChange={(e) => setNopol(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Merk
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Masukan Merek Kendaraan"
              value={merek}
              onChange={(e) => setMerk(e.target.value)}
            />
          </label>

          <div className="flex flex-col gap-2">
            <input
              className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
              type="submit"
            />
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

export default AddBuses;
