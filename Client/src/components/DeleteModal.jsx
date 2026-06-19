import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { FiAlertTriangle } from "react-icons/fi";

import { deleteApplication, getApplications } from "../api";
import { useApplications } from "../contexts/ApplicationContext";

export function DeleteModal({ show, setShow, application, setApplication }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setApplications, setStats } = useApplications();

  const onClose = () => {
    setApplication(null);
    setShow(false);
  };

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteApplication(application._id);
      const data = await getApplications();
      setApplications(data.applications);
      setStats(data.stats);
      onClose;
    } finally {
      setIsDeleting(false);
      setShow(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.95,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <FiAlertTriangle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Delete Application
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      Are you sure you want to delete {application?.company}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 text-slate-400 hover:text-slate-500"
                  >
                    <RxCross1 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-lg shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 transition-colors flex items-center"
                >
                  {isDeleting ? "Deleting..." : "Delete Application"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
