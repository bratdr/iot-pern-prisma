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

    await axios.post("http://localhost:5024/api/v1/bis", {
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
          {/* <label className="flex flex-col gap-2">
            Bus Driver
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-slate-200 bg-white px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-state"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              >
                <option value="">Select the driver</option>
                {buses.map((bus) => (
                  <option key={bus.id} value={bus.driver}>
                    {bus.driver}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </label> */}

          <label className="flex flex-col gap-2">
            Nopol
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the bus police number"
              value={nopol}
              onChange={(e) => setNopol(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Merk
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the bus police number"
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
