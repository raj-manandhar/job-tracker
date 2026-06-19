import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { AiOutlineApartment } from "react-icons/ai";
import { HiStatusOnline } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiExtraTime } from "react-icons/gi";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import { useEffect } from "react";
import { getApplication } from "../api";

const Card = ({ pop, setPop, id, setApplicationId }) => {
  const [application, setApplication] = useState();

  const onClose = () => {
    setPop(false);
    setApplicationId(null);
  };

  useEffect(() => {
    const fetchApplication = async () => {
      const data = await getApplication(id);
      setApplication(data.application);
    };
    fetchApplication();
  }, [id]);

  return (
    <AnimatePresence>
      {pop && (
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
              className="bg-white rounded-2xl shadow-xl  w-1/2 aspect-video overflow-hidden"
            >
              <div className=" bg-slate-50  p-6">
                <div className="flex items-startgap-4">
                  <div className=" flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Application Detail
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 text-slate-400 hover:text-slate-500"
                  >
                    <RxCross1 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 p-4">
                <div className="flex items-center gap-4">
                  <HiOutlineOfficeBuilding className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Company</h4>
                    <p className="text-gray-400 ml-1">{application?.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaUser className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Role</h4>
                    <p className="text-gray-400 ml-1">{application?.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <AiOutlineApartment className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Type</h4>
                    <p className="text-gray-400 ml-1">{application?.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <HiStatusOnline className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Status</h4>
                    <StatusBadge status={application?.status} />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaRegCalendarAlt className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Date</h4>
                    <p className="text-gray-400 ml-1">
                      {new Date(application?.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <GiExtraTime className="text-6xl bg-slate-100 p-2 rounded-2xl" />
                  <div>
                    <h4 className="font-medium">Note</h4>
                    <p className="text-gray-400 ml-1">{application?.note}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Card;
