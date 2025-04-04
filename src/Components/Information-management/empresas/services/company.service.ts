
import api from "../../../../api/api";

export const AllCompanies = async () => {
    const response = await api.get("/Company");
    return response.data;
  };

export const createCompany = async (data : any) => {
    const formData = new FormData();
    formData.append("BusinessName", data.nombre);
    formData.append("CountryId", data.pais);
    formData.append("Campus", data.sedes);
    formData.append("Address",data.sedes);
    formData.append("CompanyColor","dsa");
    formData.append("SizeCompanyId",data.tamaño);
    formData.append("SectorId",data.sector);
  
    if (data.img) {
      formData.append("LogoFile", data.img); // ejemplo: archivo (input type="file")
    }
  
    const response = await api.post("/Company", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  
    return response.data;
  };

export const deleteCompany = async (idCompany : string) => {
    const response = await api.delete(`/Company/${idCompany}`);
    return response.data;
};

