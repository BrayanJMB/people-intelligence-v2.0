export interface CompanyForm {
    nombre: string;
    pais: string | number;
    sedes: string;
    tamaño: string | number;
    sector: string | number;
    img: File | null;
    activo: boolean;
  
    colorPrimario: string;
    colorSecundario: string;
    colorTerciario: string;
    HeaderColorTextos: string;
    HeaderColorIcons: string;
    navColorIcon: string;
    navColorFondoIcon: string;
    btnPrimarioColor: string;
    btnPrimarioColorTexto: string;
    btnSecundarioColor: string;
    btnSecundarioColorTexto: string;
  }
  