
import api from "../../../../api/api";

export const AllCompanies = async () => {
    const response = await api.get("/Company");
    return response.data;
  };

export const createCompany = async (idUser: string, data : any) => {
    const formData = new FormData();
    formData.append("userId", idUser);
    formData.append("BusinessName", data.nombre);
    formData.append("CountryId", data.pais);
    formData.append("Campus", data.sedes);
    formData.append("Address",data.sedes);
    formData.append("SizeCompanyId",data.tamaño);
    formData.append("SectorId",data.sector);
  
    if (data.img) {
      formData.append("LogoFile", data.img); // ejemplo: archivo (input type="file")
    }

    // 🎨 Colores personalizados
    formData.append("ColorPrincipal", data.colorPrimario || "");
    formData.append("ColorSecundario", data.colorSecundario || "");
    formData.append("ColorTerciario", data.colorTerciario || "");
    formData.append("HeaderColorTextos", data.HeaderColorTextos || "");
    formData.append("HeaderColorIcons", data.HeaderColorIcons || "");
    formData.append("NavColorIcon", data.navColorIcon || "");
    formData.append("NavColorFondoIcon", data.navColorFondoIcon || "");
    formData.append("BtnPrimarioColor", data.btnPrimarioColor || "");
    formData.append("BtnPrimarioColorTexto", data.btnPrimarioColorTexto || "");
    formData.append("BtnSecundarioColor", data.btnSecundarioColor || "");
    formData.append("BtnSecundarioColorTexto", data.btnSecundarioColorTexto || "");
  
    const response = await api.post("/Company", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  
    return response.data;
  };

  export const updateCompany = async (data : any) => {
    console.log(data)
    const formData = new FormData();
    formData.append("BusinessName", data.nombre);
    formData.append("CountryId", data.pais);
    formData.append("Campus", data.sedes);
    formData.append("Address",data.sedes);
    formData.append("SizeCompanyId",data.tamaño);
    formData.append("SectorId",data.sector);
    if (data.img) {
      formData.append("LogoFile", data.img); // ejemplo: archivo (input type="file")
    }

    // 🎨 Colores personalizados
    formData.append("ColorPrincipal", data.colorPrimario || "");
    formData.append("ColorSecundario", data.colorSecundario || "");
    formData.append("ColorTerciario", data.colorTerciario || "");
    formData.append("HeaderColorTextos", data.HeaderColorTextos || "");
    formData.append("HeaderColorIcons", data.HeaderColorIcons || "");
    formData.append("NavColorIcon", data.navColorIcon || "");
    formData.append("NavColorFondoIcon", data.navColorFondoIcon || "");
    formData.append("BtnPrimarioColor", data.btnPrimarioColor || "");
    formData.append("BtnPrimarioColorTexto", data.btnPrimarioColorTexto || "");
    formData.append("BtnSecundarioColor", data.btnSecundarioColor || "");
    formData.append("BtnSecundarioColorTexto", data.btnSecundarioColorTexto || "");
  
    const response = await api.put(`/Company/${data.idCompany}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  
    return response.data;
  };


export const updateStatusCompany = async (idCompany : string, data : any) => {
    const response = await api.patch(`/Company/${idCompany}/status`, data);
    return response.data;
};
export const deleteCompany = async (idCompany : string) => {
    const response = await api.delete(`/Company/${idCompany}`);
    return response.data;
};

