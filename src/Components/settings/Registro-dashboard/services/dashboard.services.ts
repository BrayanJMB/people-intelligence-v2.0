import api from "../../../../api/api";

export const getAllDashboards = async () => {
  const response = await api.get(`/PowerBy/`);
  return response.data;
};

export const getAllDashboardsById = async (id:string) => {
  const response = await api.get(`/PowerBy/by-company/${id}`);
  return response.data;
};

export const CreateDashboard = async (data: any) => {
  const response = await api.post(`/PowerBy/`, data);
  return response.data;
};

export const UpdateDashboard = async (data: any) => {
  const response = await api.put(`/PowerBy/${data.Id}`, data);
  return response.data;
};

export const ToggleDashboardStatus = async (
  id: string,
  isActive: boolean
): Promise<void> => {
  await api.patch(`/PowerBy/${id}/toggle`, isActive, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
