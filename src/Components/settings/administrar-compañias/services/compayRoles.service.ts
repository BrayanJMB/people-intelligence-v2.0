import api from "../../../../api/api";

export const AllCompaniesRoles = async () => {
    const response = await api.get("/Company/roles");
    return response.data;
  };