import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ConnectSiswa = () => {
  const [selectedSiswa, setSelectedSiswa] = useState("");
  const [siswaList, setSiswaList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();
  const { schoolId } = useParams(); // Assuming the school ID is extracted from the URL parameters.

  useEffect(() => {
    // Fetch the list of students from the API
    axios.get("http://localhost:5024/api/v1/siswa").then((response) => {
      setSiswaList(response.data.data);
    });

    // Fetch the list of schools from the API
    axios.get("http://localhost:5024/api/v1/sekolah").then((response) => {
      setSchoolList(response.data.data);
    });
  }, []);

  const handleConnectSiswa = async () => {
    setConnecting(true);
    try {
      const response = await axios.post(
        "http://localhost:5024/api/v1/sekolah/siswa/pair",
        {
          idSiswa: selectedSiswa,
          idSekolah: selectedSchool,
        }
      );

      // Handle the response as needed, e.g., display a success message or update the UI.
      console.log("Student connected to school:", response.data);

      // After successful connection, you can redirect the user back to the ManageSchool page or any other desired page.
      navigate("/admin/dashboard/school");
    } catch (error) {
      // Handle any errors that occur during the POST request.
      console.error("Error connecting student to school:", error);
      setConnecting(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-4 rounded bg-white p-4 text-sm font-medium">
        <h1 className="text-2xl font-bold">Connect Siswa to Sekolah</h1>
        <label className="flex flex-col gap-2">
          Select Siswa
          <select
            className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
            value={selectedSiswa}
            onChange={(e) => setSelectedSiswa(e.target.value)}
          >
            <option value="" disabled>
              Select a student
            </option>
            {siswaList.map((siswa) => (
              <option key={siswa.id} value={siswa.id}>
                {siswa.nama}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          Select Sekolah
          <select
            className="rounded p-2 text-sm font-normal outline outline-1 outline-slate-200 focus:bg-sky-50 focus:duration-700"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value="" disabled>
              Select a school
            </option>
            {schoolList.map((school) => (
              <option key={school.id} value={school.id}>
                {school.nama}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <button
            onClick={handleConnectSiswa}
            className="rounded bg-sky-400 p-3 text-base font-semibold text-white hover:bg-sky-500 hover:duration-300"
            disabled={connecting || !selectedSiswa || !selectedSchool}
          >
            {connecting ? "Connecting..." : "Connect Siswa to Sekolah"}
          </button>
          <button
            onClick={() => navigate("/admin/dashboard/school")}
            className="rounded bg-rose-500 p-3 text-base font-semibold text-white hover:bg-rose-600 hover:duration-300"
            disabled={connecting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectSiswa;
