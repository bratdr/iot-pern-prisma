import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [no_induk, setNisn] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic

    await axios.post("http://localhost:5024/api/v1/siswa", {
      nama: name,
      nisn: no_induk,
    });

    // Reset form values
    setName("");
    setNisn("");

    // // Clear file input
    if (formRef.current) {
      formRef.current.reset();
    }

    // // Show alert window
    window.alert("Form submitted successfully!");

    navigate("/admin/dashboard/user");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">Tambah Data Siswa</h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="flex flex-col gap-2">
            Nama Siswa
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            Nisn
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the nisn"
              value={no_induk}
              onChange={(e) => setNisn(e.target.value)}
            />
          </label>

          <div className="mt-2 flex flex-col gap-2">
            <input
              className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
              type="submit"
            />
            <button
              onClick={() => navigate("/admin/dashboard/user")}
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

export default AddUser;
