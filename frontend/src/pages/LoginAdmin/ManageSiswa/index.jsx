import Navigation from "../../../components/AdminNav";
import { FaUser } from "react-icons/fa6";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const ManageSiswa = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async (url) => {
    const response = await axios.get(url);
    const siswaData = response.data.data;

    // Fetch individual siswa details and include cardId in the data
    const siswaDetailsPromises = siswaData.map(async (siswa) => {
      const detailResponse = await axios.get(
        `http://tracking.ta-tmj.com/api/v1/siswa/${siswa.id}`
      );
      const siswaDetail = detailResponse.data.data;
      return {
        ...siswa,
        cardId: siswaDetail.cardId,
      };
    });

    const siswaDetails = await Promise.all(siswaDetailsPromises);
    return siswaDetails;
  };

  const { data, error } = useSWR(
    "http://tracking.ta-tmj.com/api/v1/siswa",
    fetcher
  );

  const deleteSiswa = async (siswaID) => {
    // Show a confirmation alert before proceeding with the deletion
    const shouldDelete = window.confirm(
      "Anda yakin untuk menghapus user ini ? 🤨"
    );
    if (!shouldDelete) {
      return; // User canceled the deletion
    }

    try {
      await axios.delete("http://tracking.ta-tmj.com/api/v1/siswa", {
        data: { id: siswaID },
      });
      mutate("http://tracking.ta-tmj.com/api/v1/siswa");
    } catch (error) {
      console.log("Error deleting sekolah:", error);
    }
  };

  const handleUnpairCard = async (siswaID) => {
    // Show a confirmation alert before proceeding with unpairing
    const shouldUnpair = window.confirm(
      "Anda yakin untuk unpair siswa dengan card? 🤨"
    );
    if (!shouldUnpair) {
      return; // User canceled the unpairing
    }

    try {
      await axios.patch(`http://tracking.ta-tmj.com/api/v1/siswa/card/unpair`, {
        id: siswaID,
      });
      mutate("http://tracking.ta-tmj.com/api/v1/siswa");
      window.alert("Siswa unpaired from card successfully!");
    } catch (error) {
      console.log("Error unpairing siswa from card:", error);
      window.alert("Error unpairing siswa from card.");
    }
  };

  const handleUnpairSchool = async (siswaID) => {
    // Show a confirmation alert before proceeding with unpairing
    const shouldUnpair = window.confirm(
      "Anda yakin untuk unpair siswa dengan sekolah? 🤨"
    );
    if (!shouldUnpair) {
      return; // User canceled the unpairing
    }

    try {
      await axios.patch(
        `http://tracking.ta-tmj.com/api/v1/siswa/school/unpair`,
        {
          idSiswa: siswaID,
        }
      );
      mutate("http://tracking.ta-tmj.com/api/v1/siswa");
      window.alert("Siswa unpaired from sekolah successfully!");
    } catch (error) {
      console.log("Error unpairing siswa from sekolah:", error);
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
                className="flex flex-row items-center justify-center gap-4 rounded-md bg-white py-2 text-sm font-semibold text-black outline outline-1 outline-gray-200 hover:bg-black hover:text-white"
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
                          {siswa.cardId}
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
                          <Link
                            to={"/admin/dashboard/siswa/pair/card"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Card
                          </Link>
                          <Link
                            to={"/admin/dashboard/siswa/pair/school"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            School
                          </Link>
                          <button
                            onClick={() => handleUnpairCard(siswa.id)} // Added onClick event for unpairing from card
                            className="bg-rose-50 hover:text-red-800"
                          >
                            Unpair Card
                          </button>
                          <button
                            onClick={() => handleUnpairSchool(siswa.id)} // Added onClick event for unpairing from school
                            className="bg-rose-50 hover:text-red-800"
                          >
                            Unpair School
                          </button>
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
