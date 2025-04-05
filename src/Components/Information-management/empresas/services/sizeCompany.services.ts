import api from "../../../../api/api";

export const fetchAllSizeCompanies = async () => {
    const response = await api.get("/SizeCompany");
    return response.data;
  };