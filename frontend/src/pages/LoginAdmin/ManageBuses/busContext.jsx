import { createContext, useContext, useState } from "react";

const BusContext = createContext();

export const useBusContext = () => useContext(BusContext);

export const BusContextProvider = ({ children }) => {
  const [nopol, setNopol] = useState("");
  const [merk, setMerk] = useState("");

  return (
    <BusContext.Provider value={{ nopol, setNopol, merk, setMerk }}>
      {children}
    </BusContext.Provider>
  );
};