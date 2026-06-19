import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RxCross1 } from "react-icons/rx";

export function SlideOver({
  isOpen,
  setIsOpen,
  title,
  children,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  return (
    <AnimatePresence>
      {isOpen && (
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
            onClick={()=>setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{
              x: '100%',
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 200,
            }}
            className="fixed inset-y-0 right-0 w-lg bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <button
                onClick={()=>setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <RxCross1 className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
