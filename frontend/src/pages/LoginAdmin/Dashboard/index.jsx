import { useNavigate } from "react-router-dom";
import userGif from "../../../assets/user.gif";
import adminGif from "../../../assets/admin.gif";
import schoolGif from "../../../assets/manage.gif";
import driverGif from "../../../assets/driver.gif";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-screen flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold">Kelola Data</h1>
        <p className="pb-6">Pilih Tipe Data Yang Akan Di Kelola!</p>
        <div className="flex gap-3">
          <div
            onClick={() => navigate("/admin/dashboard/siswa")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={userGif} alt="my-gif" />
            <h1 className="text-xl font-bold ">Siswa</h1>
          </div>
          <div
            onClick={() => navigate("/admin/dashboard/school")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={schoolGif} alt="my-gif" />
            <h1 className="text-xl font-bold">Sekolah</h1>
          </div>
          <div
            onClick={() => navigate("/admin/dashboard/driver")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={driverGif} alt="my-gif" />
            <h1 className="text-xl font-bold">Supir</h1>
          </div>
          <div
            onClick={() => navigate("/admin/dashboard/driver")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={adminGif} alt="my-gif" />
            <h1 className="text-xl font-bold">Bis</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
