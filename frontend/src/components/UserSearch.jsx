import { useNavigate } from "react-router-dom";

const UserSearch = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center">
        <div className="flex border border-slate-200">
          <input
            type="text"
            className="block w-60 rounded-none border bg-white px-4 py-2 text-slate-700 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-40"
            placeholder="Tracking Childern Position"
          />
          <button
            onClick={() => navigate("/user/dashboard")}
            className=" rounded-none border-l bg-black text-white hover:bg-rose-500 hover:text-black"
          >
            Find
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
