import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { data_dashboard } from "../data/AdminDashboard";

const AdminNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <section className="flex gap-2">
          <div
            className={`min-h-screen border border-y-0 border-l-0 border-black bg-[#000] ${
              open ? "w-72 bg-opacity-95 sm:w-80" : "w-16"
            } px-4 text-gray-100 duration-1000`}
          >
            <div className="flex justify-end py-3">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer text-white"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="relative mt-4 flex flex-col gap-4">
              {data_dashboard?.map((data_ds, i) => (
                <Link
                  to={data_ds?.link}
                  key={i}
                  className={` ${
                    data_ds?.margin && "mt-4"
                  } group flex items-center gap-3.5 rounded-md p-2 text-sm font-medium text-white hover:bg-slate-100 hover:text-rose-600`}
                  onClick={() => setOpen(!open)}
                >
                  <div>
                    {React.createElement(data_ds?.icon, { size: "20" })}
                  </div>
                  <div className="w-4 sm:w-auto">
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre text-rose-500 duration-500 ${
                        !open && "translate-x-28 overflow-hidden opacity-0"
                      }`}
                    >
                      {data_ds?.name}
                    </h2>
                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
                    >
                      {data_ds?.name}
                    </h2>
                    <p
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`whitespace-pre text-sm text-indigo-500 duration-500 ${
                        !open && "translate-x-28 overflow-hidden opacity-0"
                      }`}
                    >
                      {data_ds?.desc}
                    </p>
                    <p
                      className={`${
                        open && "hidden"
                      } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-white  px-0 py-0 text-sm font-medium text-gray-900 drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
                    >
                      {data_ds?.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminNav;
