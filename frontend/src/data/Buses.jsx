import { drivers } from "./Drivers";

export const buses = [
  {
    id: "1",
    driver: drivers.find((driver) => driver.id === "1")?.name,
    card_driver: drivers.find((driver) => driver.id === "1")?.card_driver,
    nopol: "[ B 1234 JET ]",
    pickup: "Politeknik Negri Jakarta",
    drop: "Stadium Universitas Indonesia",
    merk: "Toyota",
  },
  {
    id: "2",
    driver: drivers.find((driver) => driver.id === "2")?.name,
    card_driver: drivers.find((driver) => driver.id === "2")?.card_driver,
    nopol: "[ AB 1243 EJT ]",
    pickup: "Halte Universitas Indonesia",
    drop: "Politeknik Negri Jakarta",
    merk: "BMW",
  },
  {
    id: "3",
    driver: drivers.find((driver) => driver.id === "3")?.name,
    card_driver: drivers.find((driver) => driver.id === "3")?.card_driver,
    nopol: "[ XB 1324 TJE ]",
    pickup: "Stasiun Universitas Indonesia",
    drop: "Kutek Universitas Indonesia",
    merk: "Honda",
  },
];
