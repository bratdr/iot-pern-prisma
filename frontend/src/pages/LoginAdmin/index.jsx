import { useNavigate } from "react-router-dom";
import adminGif from "../../assets/manage-admin.gif";

const AdminLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-screen  w-screen flex-col items-center justify-center gap-4 px-4 text-center text-black">
        <h1 className="text-3xl font-bold">
          Manage Your Tracking
          <br />
          Application Here
        </h1>
        <p className="pb-6">Insert Your Admin Key For Login!</p>
        <img className="max-w-xs" src={adminGif} alt="my-gif" />
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mt-12 flex w-24 items-center justify-center rounded-lg bg-black text-sm font-medium text-white hover:bg-rose-500 hover:font-bold hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="mt-12 flex w-24 items-center justify-center rounded-lg border border-black bg-transparent text-sm font-medium text-black hover:bg-rose-500 hover:font-bold hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
