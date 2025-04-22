import api from "../../../../api/api";
import { CreatePowerDashboardDescriptionDto, Report } from "../interfaces/CreatePowerDashboardDescriptionDto";
export const GetAllReports = async () => {
  const response = await api.get("/PowerDashboardsDescription");
  return response.data;
};

export const CreateReport = async (
  data: CreatePowerDashboardDescriptionDto
) => {
  const response = await api.post(`/PowerDashboardsDescription/`, data);
  return response.data;
};

export const UpdateReport = async (report: Report) => {
  const response = await api.put(`/PowerDashboardsDescription/${report.id}`, report);
  return response.data;
};

export const DeleteReport = async (idReport: string) => {
  const response = await api.delete(`/PowerDashboardsDescription/${idReport}`);
  return response.data;
};

