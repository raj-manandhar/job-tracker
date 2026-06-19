import React, { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Filter = ({ setQuery }) => {
  const [search, setSearch] = useState(null);

  const [status, setStatus] = useState("All");

  const query = useMemo(() => {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (status && status !== "All") {
      params.append("status", status);
    }

    return params.toString();
  }, [search, status]);

  useEffect(() => {
    setQuery(query);
  }, [query, setQuery]);

  return (
    <div className="border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 p-4">
      <div className="relative w-full sm:max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <LuSearch className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company or title..."
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
          Filter by:
        </span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full sm:w-40 pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg bg-white shadow-sm"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
