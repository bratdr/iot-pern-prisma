import React, { useState, useEffect } from "react";
import Navigation from "../../../components/AdminNav";
import { BiSolidBusSchool } from "react-icons/bi";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const ManageBuses = () => {
  const { mutate } = useSWRConfig();

  const fetcher = async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  };

  const { data, error } = useSWR(
    "http://tracking.ta-tmj.com/api/v1/bis",
    fetcher
  );

  // EMERGENCY STATUS !
  const setEmergencyStatus = async (nomorPolisi) => {
    try {
      await axios.patch(
        "http://tracking.ta-tmj.com/api/v1/bis/status/set-emergency",
        {
          nomorPolisi: nomorPolisi,
        }
      );
      // Refresh data after the status is updated
      mutate("http://tracking.ta-tmj.com/api/v1/bis");
    } catch (error) {
      console.log("Error setting emergency status:", error);
    }
  };

  // UNSET EMERGENCY STATUS !
  const unsetEmergencyStatus = async (nomorPolisi) => {
    try {
      await axios.patch(
        "http://tracking.ta-tmj.com/api/v1/bis/status/unset-emergency",
        {
          nomorPolisi: nomorPolisi,
        }
      );
      // Refresh data after the status is updated
      mutate("http://tracking.ta-tmj.com/api/v1/bis");
    } catch (error) {
      console.log("Error unsetting emergency status:", error);
    }
  };

  // Delete Bis Function
  const deleteBis = async (bisID) => {
    const shouldDelete = window.confirm(
      "Anda yakin untuk menghapus bis ini ? 🤨"
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete("http://tracking.ta-tmj.com/api/v1/bis", {
        data: { id: bisID },
      });
      mutate("http://tracking.ta-tmj.com/api/v1/bis");
    } catch (error) {
      console.log("Error deleting bus:", error);
    }
  };

  if (!data && !error) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching data: {error.message}</h2>;
  }

  return (
    <>
      <div className="z-0 flex h-screen w-screen flex-row">
        <div className="absolute z-10">
          <Navigation />
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-slate-100 pl-20 pt-16 sm:w-full">
          <div className="w-full overflow-scroll">
            <div className="mb-4">
              <h2 className="pb-8 text-4xl font-bold">Buses Management</h2>
              <Link
                to={"/admin/dashboard/buses/add"}
                className="flex flex-row items-center justify-center gap-4 rounded-md bg-white py-2 text-sm font-semibold text-black outline outline-1 outline-gray-200 hover:bg-black hover:text-white"
              >
                <BiSolidBusSchool size={16} />
                Tambah Buses
              </Link>
            </div>
            <div className="overflow-x-scroll overflow-y-scroll border-b border-gray-200 shadow sm:overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Supir
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Nopol
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Merk
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((bus, index) => (
                    <tr key={bus.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {bus.supirId ? bus.supirId : "No Driver"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {bus.nomorPolisi}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{bus.merek}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {bus.status}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2 text-sm">
                          <Link
                            to={"/admin/dashboard/buses/edit/"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteBis(bus.id)}
                            className="bg-rose-50 hover:text-red-800"
                          >
                            Delete
                          </button>
                          <Link
                            to={"/admin/dashboard/buses/set/"}
                            className="rounded bg-sky-50 px-6 py-2 text-gray-900 hover:text-sky-800"
                          >
                            Set Supir
                          </Link>
                          {bus.status === "NORMAL" ? (
                            <button
                              onClick={() =>
                                setEmergencyStatus(bus.nomorPolisi)
                              }
                              className="bg-yellow-50 hover:text-yellow-800"
                            >
                              Set Emergency
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                unsetEmergencyStatus(bus.nomorPolisi)
                              }
                              className="bg-green-50 hover:text-green-800"
                            >
                              Unset Emergency
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBuses;
