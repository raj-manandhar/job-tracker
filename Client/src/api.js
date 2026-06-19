import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApplications = async (query = "") => {
  const response = await API.get(`/applications?${query}`);

  return response.data;
};

export const getApplication = async (id) => {
  const response = await API.get(`/applications/${id}`);

  return response.data;
};

export const addApplication = async (applicationData) => {
  const response = await API.post("/applications", applicationData);

  return response.data;
};

export const updateApplication = async (id, updateData) => {
  const response = await API.patch(`/applications/${id}`, updateData);

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await API.delete(`/applications/${id}`);

  return response.data;
};

export default API;
