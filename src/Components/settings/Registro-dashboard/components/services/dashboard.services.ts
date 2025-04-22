import api from "../../../../../api/api";

export const getAllDashboards = async () => {
  const response = await api.get(`/PowerBy/`);
  return response.data;
};

export const CreateDashboard = async (data: any) => {
  const response = await api.post(`/PowerBy/`, data);
  return response.data;
};
