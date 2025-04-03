import api from "../../../../api/api";

export const AllCompanies = async () => {
    const response = await api.get("/Company");
    return response.data;
  };