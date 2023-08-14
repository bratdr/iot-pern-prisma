import axios from "axios";
import Navigation from "../../../components/Navigation";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

const HistoryPage = () => {
  const { idsiswa } = useParams();
  const [user, setUser] = useState(null);
  const [bus, setBus] = useState(null);
  const [sekolah, setSekolah] = useState(null);
  const [commuteData, setCommuteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const userResponse = await axios.get(
          `http://tracking.ta-tmj.com/api/v1/siswa/${idsiswa}`
        );
        const busId = "clkqqwx5l0000vey09t1mk9o5"; // Replace with actual bus ID
        const [sekolahResponse, commuteListResponse, busResponse] =
          await Promise.all([
            axios.get("http://tracking.ta-tmj.com/api/v1/sekolah"),
            axios.get(`http://tracking.ta-tmj.com/api/v1/commute/list`),
            axios.get(`http://tracking.ta-tmj.com/api/v1/bis/${busId}`),
          ]);

        const success =
          userResponse.data?.success &&
          sekolahResponse.data?.success &&
          commuteListResponse.data?.success &&
          busResponse.data?.success;

        if (success) {
          setUser(userResponse.data.data);
          setSekolah(
            sekolahResponse.data.data.find(
              (sekolah) => sekolah.id === userResponse.data.data.sekolahId
            )
          );
          setCommuteData(
            commuteListResponse.data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
          setBus(busResponse.data.data);
        } else {
          console.error("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idsiswa]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !bus) {
    return <div>User or Bus data not found.</div>;
  }

  return (
    <>
      <div className="w-min-screen h-screen">
        <Navigation />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 overflow-auto bg-slate-100 ">
            <h1 className="flex w-screen flex-row items-center justify-center gap-2 bg-sky-500 p-2 text-xs font-medium text-white sm:text-base">
              <FaHistory /> History :
            </h1>

            <h1 className="text-center text-base font-semibold">
              History Commute: {user.nama}
            </h1>
            <div className="w-screen px-6">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-sky-300 text-sm uppercase text-black">
                  <tr>
                    <th>No</th>
                    <th>ID Commute</th>
                    <th>Posisi Naik</th>
                    <th>Posisi Turun</th>
                    <th>Waktu Naik</th>
                    <th>Waktu Turun</th>
                  </tr>
                </thead>
                <tbody>
                  {commuteData.map((commute, index) => (
                    <tr className="border-b bg-white" key={commute.id}>
                      <td>{index + 1}</td>
                      <td>{commute.id}</td>
                      <td>{commute.startPosition}</td>
                      <td>{commute.finishPosition}</td>
                      <td>{commute.createdAt}</td>
                      <td>{commute.updatedAt}</td>
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

export default HistoryPage;
