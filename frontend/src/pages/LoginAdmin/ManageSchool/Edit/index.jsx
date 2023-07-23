import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSchool = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedId, setSelectedId] = useState("");
  const [sekolahData, setSekolahData] = useState([]);
  const [nama, setSekolah] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNoTelp] = useState("");

  useEffect(() => {
    const fetchSekolahData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5024/api/v1/sekolah"
        );
        setSekolahData(response.data.data);
        setSelectedId(id);
      } catch (error) {
        console.log("Error fetching sekolah data:", error);
      }
    };

    fetchSekolahData();
  }, [id]);

  useEffect(() => {
    const selectedSekolah = sekolahData.find(
      (sekolah) => sekolah.id === selectedId
    );

    if (selectedSekolah) {
      setSekolah(selectedSekolah.nama);
      setAlamat(selectedSekolah.alamat);
      setNoTelp(selectedSekolah.nomorTelepon);
    }
  }, [selectedId, sekolahData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic

    try {
      await axios.patch("http://localhost:5024/api/v1/sekolah", {
        id: selectedId,
        nama,
        alamat,
        nomorTelepon,
      });

      window.alert("Sekolah data updated successfully!");
      navigate("/admin/dashboard/school");
    } catch (error) {
      console.log("Error updating sekolah data:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">Ubah Data Sekolah</h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col gap-2">
            Select ID Sekolah:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select ID --</option>
              {sekolahData.map((sekolah) => (
                <option key={sekolah.id} value={sekolah.id}>
                  {sekolah.id}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Nama
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the sekolah name"
              value={nama}
              onChange={(e) => setSekolah(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Alamat
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the address"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Nomor Telepon
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the address"
              value={nomorTelepon}
              onChange={(e) => setNoTelp(e.target.value)}
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
              onClick={() => navigate("/admin/dashboard/school")}
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

export default EditSchool;
