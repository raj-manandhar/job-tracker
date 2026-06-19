import React from "react";

const StatusBadge = ({ status, className }) => {
  const styles = {
    Applied: "bg-purple-300/20 text-purple-600 border-purple-200",
    Interviewing: "bg-blue-300/20 text-blue-700 border-blue-200",
    Offer: "bg-green-300/20 text-green-600 border-green-200",
    Rejected: "bg-red-300/20 text-red-600 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${styles[status] || "bg-gray-100 text-gray-700 border-gray-300"} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
