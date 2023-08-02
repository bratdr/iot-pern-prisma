import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const SiswaList = () => {
  const { schoolId } = useParams();
  const [siswaList, setSiswaList] = useState([]);
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    // Fetch the list of students for the specific school using schoolId
    const fetchSiswaList = async () => {
      try {
        const response = await axios.get(
          `http://tracking.ta-tmj.com/api/v1/sekolah/siswa/list/${schoolId}`
        );
        setSiswaList(response.data.data.daftarSiswa);
        setSchoolName(response.data.data.dataSekolah.nama);
      } catch (error) {
        console.log("Error fetching SiswaList data:", error);
      }
    };

    fetchSiswaList();
  }, [schoolId]);

  return (
    <div className="h-full w-screen p-12">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">
          Daftar Siswa Dari Sekolah : {schoolName}
        </h2>
        <div className="w-full overflow-x-scroll">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  NISN
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {siswaList.map((siswa) => (
                <tr key={siswa.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {siswa.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {siswa.nama}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {siswa.nisn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SiswaList;
