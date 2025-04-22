export interface DashboardModalProps {
  isEditing: boolean;
  data: {
    Id?:string;
    reportId: string;
    groupId: string;
    powerByDescriptionDashboardId: number | string;
    powerByDescriptionDashboard?: string;
    companyId: number | string;
    //activo: boolean;
  };
  reports: Report[]; 
  companies: Company[]; 
  onChange: (key: keyof DashboardModalProps["data"], value: string) => void;
  onChangeReport: (e: React.ChangeEvent<HTMLSelectElement>) => void; // 🔧 Tipado correcto del evento
  onCancel: () => void;
  onSubmit: () => void;
  currentStep: number;
}

export interface Dashboard {
    id: string;
    reportId: string;
    groupId: string;
    powerByDashboardDescpritionId: string;
    companyId: string;
    companyLogo?: string;
    companyName: string;
    reportName: string;
    reportDescription?: string;
    isActive: boolean;
  }
  
  export interface Company {
    id: string;
    businessName: string;
    logo: string;
  }
  
  export interface Report {
    id: string;
    name: string;
    description: string;
  }
  