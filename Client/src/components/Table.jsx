import React from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoMdMore } from "react-icons/io";
import StatusBadge from "./StatusBadge";
import { useApplications } from "../contexts/ApplicationContext";
import { RiEdit2Fill } from "react-icons/ri";
import { BsTrash2 } from "react-icons/bs";
import { useState } from "react";

const Table = ({ setApplication, setIsOpen, setShow, setPop }) => {
  const { applications } = useApplications();
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Company & Role
            </th>
            <th
              scope="col"
              className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
            >
              Applied Date
            </th>
            <th
              scope="col"
              className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell"
            >
              Type
            </th>
            <th scope="col" className="relative px-6 py-3.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {applications?.map((application) => (
            <tr className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  onClick={() => {
                    setApplication(application);
                    setPop(true);
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                    <HiOutlineOfficeBuilding className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {application.company}
                    </div>
                    <div className="text-sm text-slate-500">
                      {application.role}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-slate-500">
                  {new Date(application.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-sm text-slate-500">
                {application.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => {
                      setActiveDropdown(
                        activeDropdown === application._id
                          ? null
                          : application._id,
                      );
                      setApplication();
                    }}
                    className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
                  >
                    <IoMdMore className="text-2xl" />
                  </button>

                  {activeDropdown === application._id && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-slate-100 z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setApplication(application);
                            setIsOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="group flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                        >
                          <RiEdit2Fill className="mr-3 h-4 w-4 text-slate-400 group-hover:text-emerald-500" />
                          Edit Application
                        </button>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setApplication(application);
                            setShow(true);
                          }}
                          className="group flex items-center w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                        >
                          <BsTrash2 className="mr-3 h-4 w-4 text-rose-400 group-hover:text-rose-500" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
