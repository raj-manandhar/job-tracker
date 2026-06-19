import React, { useState } from "react";
import { addApplication, getApplications, updateApplication } from "../api";
import { useApplications } from "../contexts/ApplicationContext";
import { useEffect } from "react";

const ApplicationForm = ({ setIsOpen, application }) => {
  const { setApplications, setStats } = useApplications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    type: "Internship",
    status: "Applied",
    date: "",
    note: "",
  });

  useEffect(() => {
    if (application) {
      setFormData({
        company: application.company || "",
        role: application.role || "",
        type: application.type || "Internship",
        status: application.status || "Applied",
        date: application.date ? application.date.slice(0, 10) : "",
        note: application.note || "",
      });
    } else {
      setFormData({
        company: "",
        role: "",
        type: "Internship",
        status: "Applied",
        date: "",
        note: "",
      });
    }
  }, [application]);

  const validate = () => {
    const newErrors = {};
    if (!formData.company || formData.company.length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }
    if (!formData.role) {
      newErrors.role = "Job title is required";
    }
    if (!formData.date) {
      newErrors.date = "Applied date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (application) await updateApplication(application._id, formData);
      else await addApplication(formData);

      setFormData({
        company: "",
        role: "",
        type: "Internship",
        status: "Applied",
        date: "",
        note: "",
      });
      const data = await getApplications();
      setApplications(data.applications);
      setStats(data.stats);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors 
                ${errors.company ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500" : "border-slate-300"}
                `}
            placeholder="e.g. Google"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-rose-500">{errors.company}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Job Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors
                ${errors.role ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500" : "border-slate-300"}
                `}
            placeholder="e.g. Frontend Intern"
          />
          {errors.role && (
            <p className="mt-1 text-sm text-rose-500">{errors.role}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Job Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
            >
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Applied Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors 
                ${errors.date ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500" : "border-slate-300"}
                `}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-rose-500">{errors.date}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="notes"
            name="note"
            rows={4}
            value={formData.note}
            onChange={handleChange}
            className="flex-1 w-full h-fit px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors resize-none"
            placeholder="Add any details about the application, interviews, or next steps..."
          />
        </div>
      </div>

      <div className="border-t border-slate-200 p-6 bg-slate-50 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          //   disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          //   disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : application ? (
            "Save Chages"
          ) : (
            "Add Application"
          )}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
