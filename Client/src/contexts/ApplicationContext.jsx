import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  });

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        setApplications,
        stats,
        setStats,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  return useContext(ApplicationContext);
};
