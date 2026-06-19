import React from "react";
import { SiPivotaltracker } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";

const Header = ({ setIsOpen }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-10">
      <div className="w-full h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
            <SiPivotaltracker className="text-2xl text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Job Tracker
          </h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
        >
          <IoMdAdd className="" />
          Add Application
        </button>
      </div>
    </header>
  );
};

export default Header;
