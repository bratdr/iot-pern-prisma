import Navigation from "../../../components/AdminNav";
import { FaUser } from "react-icons/fa6";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const ManageSiswa = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  };

  const { data, error } = useSWR("http://localhost:5024/api/v1/siswa", fetcher);

  const deleteSiswa = async (siswaID) => {
    // Show a confirmation alert before proceeding with the deletion
    const shouldDelete = window.confirm(
      "Anda yakin untuk menghapus user ini ? 🤨"
    );
    if (!shouldDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete("http://localhost:5024/api/v1/siswa", {
        data: { id: siswaID },
      });
      mutate("http://localhost:5024/api/v1/siswa");
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
            <div className="mb-4">
              <h2 className="pb-8 text-4xl font-bold">Siswa Management</h2>
              <Link
                to={"/admin/dashboard/siswa/add"}
                className="flex flex-row items-center justify-center gap-4 rounded-md bg-black py-2 text-sm font-semibold text-white outline outline-1 outline-gray-200 hover:bg-white hover:text-black"
              >
                <FaUser size={16} />
                Tambah Siswa
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
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Nisn
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Card ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Sekolah
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
                  {data.map((siswa, index) => (
                    <tr key={siswa.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {siswa.nama}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {siswa.nisn}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {siswa.card_id}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {siswa.Sekolah?.nama || "Tidak didaftarkan"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 text-sm">
                          <Link
                            to={"/admin/dashboard/siswa/edit/"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteSiswa(siswa.id)}
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

export default ManageSiswa;
