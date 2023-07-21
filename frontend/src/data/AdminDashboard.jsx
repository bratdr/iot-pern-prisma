import { RiLogoutBoxRFill } from "react-icons/ri";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaSchool, FaUserAlt } from "react-icons/fa";
import { BiSolidBusSchool } from "react-icons/bi";

export const data_dashboard = [
  {
    id: "1",
    name: "Manage User",
    link: "/admin/dashboard/user",
    icon: TbMoodKidFilled,
  },
  {
    id: "2",
    name: "Manage School",
    link: "/admin/dashboard/school",
    icon: FaSchool,
  },
  {
    id: "3",
    name: "Manage Driver",
    link: "/admin/dashboard/driver",
    icon: FaUserAlt,
  },
  {
    id: "4",
    name: "Manage Buses",
    link: "/admin/dashboard/buses",
    icon: BiSolidBusSchool,
  },
  { id: "9", name: "Logout", link: "/", icon: RiLogoutBoxRFill, margin: true },
];
