import { TFunction } from 'i18next'

export const informationCompanies = (t: TFunction) => [
  { header: t('companyName'), field: "businessName", sortable: true, hasImage: true },
  { header: t('country'),     field: "country",      sortable: true  },
  { header: t('address'),     field: "address",      sortable: true  },
  { header: t('size'),        field: "sizeCompany",  sortable: true  },
  { header: t('sector'),      field: "sector",       sortable: true  },
  { header: t('options'),     field: "options",      sortable: false },
  { header: t('actions'),     field: "actions",      sortable: false },
]