import Navigation from "../../../components/AdminNav";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";
import { FaSchool, FaUser } from "react-icons/fa6";

const ManageSchool = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  };

  const { data, error } = useSWR(
    "http://localhost:5024/api/v1/sekolah",
    fetcher
  );

  const deleteSekolah = async (sekolahID) => {
    // Show a confirmation alert before proceeding with the deletion
    const shouldDelete = window.confirm(
      "Anda yakin untuk menghapus user ini ? 🤨"
    );
    if (!shouldDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete("http://localhost:5024/api/v1/sekolah", {
        data: { id: sekolahID },
      });
      mutate("http://localhost:5024/api/v1/sekolah");
    } catch (error) {
      console.log("Error deleting sekolah:", error);
    }
  };

  if (!data && !error) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="z-0 flex h-screen w-screen flex-row">
        <div className="absolute z-10">
          <Navigation />
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-slate-100 pl-20 pt-16 sm:w-full">
          <div className="w-full overflow-scroll">
            <div className="mb-4 flex flex-col gap-2">
              <h2 className="pb-8 text-4xl font-bold">School Management</h2>
              <Link
                to={"/admin/dashboard/school/add"}
                className="flex flex-row items-center justify-center gap-4 rounded-md bg-white py-2 text-sm font-semibold text-black outline outline-1 outline-gray-200 hover:bg-black hover:text-white"
              >
                <FaSchool size={16} />
                Tambah Sekolah
              </Link>
              <Link
                to={"/admin/dashboard/school/connect/siswa"}
                className="flex flex-row items-center justify-center gap-4 rounded-md bg-white py-2 text-sm font-semibold text-black outline outline-1 outline-gray-200 hover:bg-black hover:text-white"
              >
                <FaUser size={16} />
                Daftarkan Siswa
              </Link>
            </div>
            <div className="overflow-x-scroll overflow-y-scroll border-b border-gray-200 shadow sm:overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Alamat
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      No. Telp
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((school, index) => (
                    <tr key={school.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {school.nama}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {school.alamat}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {school.nomorTelepon}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 text-sm">
                          <Link
                            to={"/admin/dashboard/school/edit"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/admin/dashboard/school/${school.id}/siswa`} // Pass the school ID in the URL
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Siswa
                          </Link>
                          <button
                            onClick={() => deleteSekolah(school.id)}
                            className="bg-rose-50 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSchool;
