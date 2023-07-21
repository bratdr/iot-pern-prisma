import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/LoginUser/Dashboard";
import AdminDashboard from "./pages/LoginAdmin/Dashboard";
import History from "./pages/LoginUser/History";
import ManageUser from "./pages/LoginAdmin/ManageUser";
import AddUser from "./pages/LoginAdmin/ManageUser/Add";
import EditUser from "./pages/LoginAdmin/ManageUser/Edit";
import ManageDriver from "./pages/LoginAdmin/ManageDriver";
import AddDriver from "./pages/LoginAdmin/ManageDriver/Add";
import EditDriver from "./pages/LoginAdmin/ManageDriver/Edit";
import ManageSchool from "./pages/LoginAdmin/ManageSchool";
import AddSchool from "./pages/LoginAdmin/ManageSchool/Add";
import EditSchool from "./pages/LoginAdmin/ManageSchool/Edit";
import ManageBuses from "./pages/LoginAdmin/ManageBuses";
import AddBuses from "./pages/LoginAdmin/ManageBuses/Add";
import EditBuses from "./pages/LoginAdmin/ManageBuses/Edit";

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
          <Route path="/admin/dashboard/user" element={<ManageUser />} />
          <Route path="/admin/dashboard/user/add" element={<AddUser />} />
          <Route path="/admin/dashboard/user/edit" element={<EditUser />} />
          <Route path="/admin/dashboard/driver" element={<ManageDriver />} />
          <Route path="/admin/dashboard/driver/add" element={<AddDriver />} />
          <Route path="/admin/dashboard/driver/edit" element={<EditDriver />} />
          <Route path="/admin/dashboard/school" element={<ManageSchool />} />
          <Route path="/admin/dashboard/school/add" element={<AddSchool />} />
          <Route path="/admin/dashboard/school/edit" element={<EditSchool />} />
          <Route path="/admin/dashboard/buses/" element={<ManageBuses />} />
          <Route path="/admin/dashboard/buses/add" element={<AddBuses />} />
          <Route path="/admin/dashboard/buses/edit" element={<EditBuses />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
