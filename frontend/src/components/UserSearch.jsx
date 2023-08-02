import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validSiswaIds, setValidSiswaIds] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of valid Siswa IDs from the Daftar request
  const fetchValidSiswaIds = async () => {
    try {
      const response = await axios.get(
        "http://tracking.ta-tmj.com/api/v1/siswa"
      );

      const success = response.data?.success;
      const data = response.data?.data;

      if (success && Array.isArray(data) && data.length > 0) {
        const siswaIds = data.map((siswa) => siswa.id);
        setValidSiswaIds(siswaIds);
      } else {
        console.error("Failed to fetch Siswa data.");
      }
    } catch (error) {
      console.error("Error fetching Siswa data:", error);
    }
  };

  // Fetch the list of valid Siswa IDs when the component mounts
  useEffect(() => {
    fetchValidSiswaIds();
  }, []);

  // Update the handleSearch function to include the Siswa ID in the URL
  const handleSearch = () => {
    if (searchValue.trim() === "") {
      alert("Please enter a valid Siswa ID.");
      return;
    }

    if (validSiswaIds.includes(searchValue)) {
      // Redirect the user to the dashboard page with the Siswa ID as a parameter
      navigate(`/user/dashboard/${searchValue}`);
    } else {
      alert("Invalid Siswa ID. Please enter a valid Siswa ID.");
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex border border-slate-200">
          <input
            type="text"
            className="block w-60 rounded-none border bg-white px-4 py-2 text-slate-700 focus:border-slate-400 focus:outline-none focus:ring focus:ring-slate-300 focus:ring-opacity-40"
            placeholder="Tracking Childern Position"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="rounded-none border-l bg-black text-white hover:bg-rose-500 hover:text-black"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Find"}
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSearch;
