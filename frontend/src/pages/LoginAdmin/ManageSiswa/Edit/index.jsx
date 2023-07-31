import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedId, setSelectedId] = useState("");
  const [siswaData, setSiswaData] = useState([]);
  const [nama, setNama] = useState("");
  const [nisn, setNisn] = useState("");
  const [card_id, setCard] = useState("");
  const [sekolah, setSekolah] = useState("");

  useEffect(() => {
    const fetchSiswaData = async () => {
      try {
        const response = await axios.get("http://localhost:5024/api/v1/siswa");
        setSiswaData(response.data.data);
        setSelectedId(id);
      } catch (error) {
        console.log("Error fetching driver data:", error);
      }
    };

    fetchSiswaData();
  }, [id]);

  useEffect(() => {
    const selectedSiswa = siswaData.find((siswa) => siswa.id === selectedId);

    if (selectedSiswa) {
      setNama(selectedSiswa.nama);
      setNisn(selectedSiswa.nisn);
      setCard(selectedSiswa.card_id);
      setSekolah(selectedSiswa.sekolah);
    }
  }, [selectedId, siswaData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, update the selected siswa's data in the API
      await axios.post(`http://localhost:5024/api/v1/siswa/card/pair`, {
        id: selectedId,
        cardID: card_id,
      });

      // Next, update the other siswa data (nama, nisn, sekolah) with a patch request
      await axios.patch(`http://localhost:5024/api/v1/siswa`, {
        id: selectedId,
        nama,
        nisn,
        sekolah,
      });

      window.alert("Siswa data updated successfully!");
      navigate("/admin/dashboard/user");
    } catch (error) {
      console.log("Error updating siswa data:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">Ubah Data Siswa</h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleFormSubmit}
        >
          <label className="flex flex-col gap-2">
            Select Siswa ID:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select ID --</option>
              {siswaData.map((siswa) => (
                <option key={siswa.id} value={siswa.id}>
                  {siswa.id}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Nama Siswa
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the name"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Nisn
            <input
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the nisn"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            ID Card
            <input
              className="mb-4 rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              type="text"
              placeholder="Enter the driver address"
              value={card_id}
              onChange={(e) => setCard(e.target.value)}
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

export default EditUser;
