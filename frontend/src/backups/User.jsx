import { BiSolidBusSchool } from "react-icons/bi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaAddressCard, FaSchool, FaUserAlt, FaHistory } from "react-icons/fa";
import { FaMapLocationDot, FaMapLocation } from "react-icons/fa6";

export const users = [
  {
    id: "1",
    name: "ID Kartu",
    desc: "id: 10A98DB321",
    icon: FaAddressCard,
  },
  {
    id: "2",
    name: "Nama Anak",
    desc: "Udin Susetyo",
    icon: TbMoodKidFilled,
  },
  {
    id: "3",
    name: "Sekolah",
    desc: "Politeknik Negri Jakarta",
    icon: FaSchool,
  },
  {
    id: "4",
    name: "Posisi Naik",
    desc: "Politeknik Negri Jakarta",
    icon: FaMapLocationDot,
  },
  {
    id: "5",
    name: "Posisi Turun",
    desc: "Halte Universitas Indonesia",
    icon: FaMapLocation,
  },
  {
    id: "6",
    name: "Bus Info",
    desc: "[B 1234 ABC]",
    icon: BiSolidBusSchool,
  },
  {
    id: "7",
    name: "Driver",
    desc: "Jaenudin Gofar",
    icon: FaUserAlt,
  },
  {
    id: "8",
    name: "History",
    link: "/dashboard_user/history",
    icon: FaHistory,
    margin: true,
  },
  { id: "1", name: "Logout", link: "/", icon: RiLogoutBoxRFill, margin: true },
];
