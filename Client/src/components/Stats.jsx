import React from "react";
import { RiContractLine, RiFileCloseLine } from "react-icons/ri";
import { BsPatchQuestion } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { useApplications } from "../contexts/ApplicationContext";

const Stats = () => {
  const { stats } = useApplications();
  return (
    <div className="w-full grid grid-cols-2 gap-4 p-14 cursor-pointer">
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-300/20">
          <LuLayoutDashboard className="text-2xl text-gray-600" />
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-medium text-slate-500">Total</p>
          <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 cursor-pointer">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-300/20">
          <BsPatchQuestion className="text-2xl text-blue-600" />
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-medium text-slate-500">Interview</p>
          <p className="text-2xl font-bold text-slate-900">{stats.interview}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 cursor-pointer">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-300/20">
          <RiContractLine className="text-2xl text-green-600" />
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-medium text-slate-500">Offer</p>
          <p className="text-2xl font-bold text-slate-900">{stats.offer}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4 cursor-pointer">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-300/20">
          <RiFileCloseLine className="text-2xl text-red-600" />
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm font-medium text-slate-500">Reject</p>
          <p className="text-2xl font-bold text-slate-900">{stats.rejected}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
