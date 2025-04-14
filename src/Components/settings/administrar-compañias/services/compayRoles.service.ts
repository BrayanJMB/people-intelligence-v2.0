import api from "../../../../api/api";

export const AllCompaniesRoles = async () => {
    const response = await api.get("/Company/roles");
    return response.data;
  };

  export const AllCompaniesRolesUnassigned= async (companyId: string) => {
    const response = await api.get(`/CompanyRole/${companyId}`);
    return response.data;
  };

export const createCompanyRol = async (data : any) => {
  const response = await api.post(`/CompanyRole`, data);
  return response;
};