import api from "../../../../api/api";

export const AllSectors= async () => {
    const response = await api.get("/Sector");
    return response.data;
  };