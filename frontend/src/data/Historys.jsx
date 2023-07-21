import { users } from "./Users";
import { buses } from "./Buses";

export const historys = [
  {
    id: "1",
    date: "Monday, 12 July 2023",
    time: "11.45",
    user: users.find((user) => user.id === "1"),
    driver: buses.find((bus) => bus.id === "1").driver,
    pickup: buses.find((bus) => bus.id === "1")?.pickup,
    drop: buses.find((bus) => bus.id === "1")?.drop,
    plat: buses.find((bus) => bus.id === "1").nopol,
  },
  {
    id: "2",
    date: "Sunday, 11 July 2023",
    time: "16.15",
    user: users.find((user) => user.id === "1"),
    driver: buses.find((bus) => bus.id === "2").driver,
    pickup: buses.find((bus) => bus.id === "2")?.pickup,
    drop: buses.find((bus) => bus.id === "2")?.drop,
    plat: buses.find((bus) => bus.id === "2").nopol,
  },
  {
    id: "3",
    date: "Saturday, 10 July 2023",
    time: "07.45",
    user: users.find((user) => user.id === "1"),
    driver: buses.find((bus) => bus.id === "3").driver,
    pickup: buses.find((bus) => bus.id === "3")?.pickup,
    drop: buses.find((bus) => bus.id === "3")?.drop,
    plat: buses.find((bus) => bus.id === "3").nopol,
  },

  {
    id: "4",
    date: "Friday, 9 July 2023",
    time: "19.45",
    user: users.find((user) => user.id === "1"),
    driver: buses.find((bus) => bus.id === "2").driver,
    pickup: buses.find((bus) => bus.id === "2")?.pickup,
    drop: buses.find((bus) => bus.id === "2")?.drop,
    plat: buses.find((bus) => bus.id === "2").nopol,
  },
  {
    id: "5",
    date: "Thursday, 8 July 2023",
    time: "15.15",
    // pickup: "Gymnasium Universitas Indonesia",
    user: users.find((user) => user.id === "1"),
    driver: buses.find((bus) => bus.id === "1").driver,
    pickup: buses.find((bus) => bus.id === "1")?.pickup,
    drop: buses.find((bus) => bus.id === "1")?.drop,

    plat: buses.find((bus) => bus.id === "1").nopol,
  },
];
