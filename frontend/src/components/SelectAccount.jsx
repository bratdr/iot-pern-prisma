import { useNavigate } from "react-router-dom";
import userGif from "../assets/user.gif";
import adminGif from "../assets/admin.gif";

const SelectAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-screen flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold">Select Account</h1>
        <p className="pb-6">Choose your account type!</p>
        <div className="flex gap-3">
          <div
            onClick={() => navigate("/login/user")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={userGif} alt="my-gif" />
            <h1 className="text-xl font-bold">User</h1>
          </div>
          <div
            onClick={() => navigate("/login/admin")}
            className="flex w-1/2 flex-col items-center justify-center gap-7 overflow-hidden px-4 py-6 outline outline-1 outline-slate-300 hover:bg-rose-500 hover:text-white hover:outline-slate-700"
          >
            <img src={adminGif} alt="my-gif" />
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectAccount;
