import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PairSiswaSchool = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedSiswaId, setSelectedSiswaId] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [siswaData, setSiswaData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  useEffect(() => {
    const fetchSiswaData = async () => {
      try {
        const response = await axios.get(
          "http://tracking.ta-tmj.com/api/v1/siswa"
        );
        setSiswaData(response.data.data);
      } catch (error) {
        console.log("Error fetching siswa data:", error);
      }
    };

    const fetchSchoolData = async () => {
      try {
        const response = await axios.get(
          "http://tracking.ta-tmj.com/api/v1/sekolah"
        );
        setSchoolData(response.data.data);
      } catch (error) {
        console.log("Error fetching school data:", error);
      }
    };

    fetchSiswaData();
    fetchSchoolData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pair the selected siswa with the selected school using the POST method
      await axios.post(`http://tracking.ta-tmj.com/api/v1/siswa/school/pair`, {
        idSiswa: selectedSiswaId,
        idSekolah: selectedSchoolId,
      });

      window.alert("Siswa paired with school successfully!");
      navigate("/admin/dashboard/siswa");
    } catch (error) {
      console.log("Error pairing siswa with school:", error);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-200 px-8">
      <div className="flex w-full flex-col rounded bg-slate-800 p-4 sm:w-3/6 xl:w-1/4">
        <h1 className="text-3xl font-bold text-gray-50">
          Pair Siswa with School
        </h1>
      </div>
      <div className="flex w-full flex-col rounded bg-slate-100 p-4 sm:w-3/6 xl:w-1/4">
        <form
          className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium outline outline-1 outline-slate-200"
          onSubmit={handleFormSubmit}
        >
          <label className="flex flex-col gap-2">
            Select Siswa:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedSiswaId}
              onChange={(e) => setSelectedSiswaId(e.target.value)}
            >
              <option value="">-- Select Siswa --</option>
              {siswaData.map((siswa) => (
                <option key={siswa.id} value={siswa.id}>
                  {siswa.nama} (ID Siswa: {siswa.id})
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Select School:
            <select
              className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
              value={selectedSchoolId}
              onChange={(e) => setSelectedSchoolId(e.target.value)}
            >
              <option value="">-- Select School --</option>
              {schoolData.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.nama} (ID School: {school.id})
                </option>
              ))}
            </select>
          </label>

          <div className="mt-2 flex flex-col gap-2">
            <input
              className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
              type="submit"
              value="Pair Siswa and School"
            />
            <button
              onClick={() => navigate("/admin/dashboard/siswa")}
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

export default PairSiswaSchool;
