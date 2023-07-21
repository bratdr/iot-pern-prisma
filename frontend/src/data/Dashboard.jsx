import { BiSolidBusSchool } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaAddressCard, FaSchool, FaUserAlt, FaHistory } from "react-icons/fa";
import {
  FaMapLocationDot,
  FaMapLocation,
  FaLocationDot,
} from "react-icons/fa6";
import { users } from "../data/Users";
import { buses } from "./Buses";

export const data_dashboard = [
  {
    id: "0",
    name: "Tracking Position",
    link: "/user/dashboard",
    icon: FaLocationDot,
  },
  {
    id: "1",
    name: "History",
    link: "/user/dashboard/history",
    icon: FaHistory,
    margin: true,
  },
  {
    id: "2",
    name: "Nama Anak",
    desc: users.find((user) => user.id === "1")?.name,
    icon: TbMoodKidFilled,
  },
  {
    id: "3",
    name: "Sekolah",
    desc: users.find((user) => user.id === "1")?.school,
    icon: FaSchool,
  },
  {
    id: "4",
    name: "Posisi Naik",
    desc: buses.find((bus) => bus.id === "1")?.pickup,
    icon: FaMapLocationDot,
  },
  {
    id: "5",
    name: "Posisi Turun",
    desc: buses.find((bus) => bus.id === "1")?.drop,
    icon: FaMapLocation,
  },
  {
    id: "6",
    name: "Bus Info",
    desc: buses.find((bus) => bus.id === "1")?.nopol,
    icon: BiSolidBusSchool,
  },
  {
    id: "7",
    name: "Driver",
    desc: buses.find((bus) => bus.id === "1")?.driver,
    icon: FaUserAlt,
  },
  {
    id: "8",
    name: "ID Kartu",
    desc: users.find((user) => user.id === "1")?.card_id,
    icon: FaAddressCard,
  },
  { id: "9", name: "Logout", link: "/", icon: RiLogoutBoxRFill, margin: true },
];
