import api from "../../../../api/api";

export const AllCountries= async () => {
    const response = await api.get("/Country");
    return response.data;
  };

