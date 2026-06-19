import React, { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Filter from "./components/Filter";
import Table from "./components/Table";
import { SlideOver } from "./components/SlideOver";
import ApplicationForm from "./components/ApplicationForm";
import { getApplications } from "./api";
import { useApplications } from "./contexts/ApplicationContext";
import { DeleteModal } from "./components/DeleteModal";
import Card from "./components/Card";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [application, setApplication] = useState(null);
  const { setApplications, setStats } = useApplications();
  const [show, setShow] = useState(false);
  const [pop, setPop] = useState(false);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getApplications(query);
      setApplications(data.applications);
      setStats(data.stats);
    };

    console.log(query);

    fetchApplications();
  }, [query]);
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Toaster position="top-right" richColors />
      <Header setIsOpen={setIsOpen} />
      <Stats />
      <div className="px-10">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <Filter setQuery={setQuery} />
          <Table
            setApplication={setApplication}
            setIsOpen={setIsOpen}
            setShow={setShow}
            setPop={setPop}
          />
        </div>
      </div>
      <SlideOver
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={!application ? "Add Application" : "Edit Application"}
      >
        <ApplicationForm setIsOpen={setIsOpen} application={application} />
      </SlideOver>
      <Card
        id={application?._id}
        setApplicationId={setApplication}
        pop={pop}
        setPop={setPop}
      />
      <DeleteModal
        show={show}
        setShow={setShow}
        application={application}
        setApplication={setApplication}
      />
    </div>
  );
};

export default App;
