import axios from "axios";

const BASE_URL = "https://reachxmarketplace.onrender.com";

const api = axios.create({ baseURL: BASE_URL });

export const loginUser = async (data) => {
  const res = await api.post("/admin/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/admin/register", data);
  return res.data;
};

export const createProject = async (formData) => {
  const res = await api.post("/project/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getProjects = async () => {
  const res = await api.get("/project");
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/project/edit/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/project/delete/${id}`);
  return res.data;
};

export const createClient = async (formData) => {
  const res = await api.post("/client/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};