import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/LoginUser/Dashboard";
import AdminDashboard from "./pages/LoginAdmin/Dashboard";
import History from "./pages/LoginUser/History";
import ManageSiswa from "./pages/LoginAdmin/ManageSiswa";
import AddSiswa from "./pages/LoginAdmin/ManageSiswa/Add";
import EditSiswa from "./pages/LoginAdmin/ManageSiswa/Edit";
import ManageDriver from "./pages/LoginAdmin/ManageDriver";
import AddDriver from "./pages/LoginAdmin/ManageDriver/Add";
import EditDriver from "./pages/LoginAdmin/ManageDriver/Edit";
import ManageSchool from "./pages/LoginAdmin/ManageSchool";
import AddSchool from "./pages/LoginAdmin/ManageSchool/Add";
import EditSchool from "./pages/LoginAdmin/ManageSchool/Edit";
import SiswaSchool from "./pages/LoginAdmin/ManageSchool/Siswa";
import ManageBuses from "./pages/LoginAdmin/ManageBuses";
import AddBuses from "./pages/LoginAdmin/ManageBuses/Add";
import EditBuses from "./pages/LoginAdmin/ManageBuses/Edit";
import ConnectSiswa from "./pages/LoginAdmin/ManageSchool/ConnectSiswa";
import SetSupir from "./pages/LoginAdmin/ManageBuses/Set";
import TestMap from "./pages/TestMap";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/dashboard/history" element={<History />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/siswa" element={<ManageSiswa />} />
          <Route path="/admin/dashboard/siswa/add" element={<AddSiswa />} />
          <Route path="/admin/dashboard/siswa/edit" element={<EditSiswa />} />
          <Route path="/admin/dashboard/driver" element={<ManageDriver />} />
          <Route path="/admin/dashboard/driver/add" element={<AddDriver />} />
          <Route path="/admin/dashboard/driver/edit" element={<EditDriver />} />
          <Route path="/admin/dashboard/school" element={<ManageSchool />} />
          <Route path="/admin/dashboard/school/add" element={<AddSchool />} />
          <Route path="/admin/dashboard/school/edit" element={<EditSchool />} />
          <Route
            path="/admin/dashboard/school/:schoolId/siswa"
            element={<SiswaSchool />}
          />{" "}
          {/* Add the SiswaList route with the correct location */}
          <Route
            path="/admin/dashboard/school/connect/siswa"
            element={<ConnectSiswa />}
          />
          <Route path="/admin/dashboard/buses/" element={<ManageBuses />} />
          <Route path="/admin/dashboard/buses/add" element={<AddBuses />} />
          <Route path="/admin/dashboard/buses/edit" element={<EditBuses />} />
          <Route path="/admin/dashboard/buses/set" element={<SetSupir />} />
          <Route path="/map/test" element={<TestMap />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
