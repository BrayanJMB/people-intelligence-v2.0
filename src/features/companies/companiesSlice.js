import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';

//import client from '../../utils/axiosInstance';
import api from '../../api/api';
const initialState = {
  companies: [],
  currentCompany: null,
};

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({idUser}) => {
      const { data } = await api.get(`companias/MultiCompani/${idUser}`);
    return data;
  }
);

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    currentCompanySelected(state, action) {
      // search company by id
      const company = state.companies
        .find((company) => company.id === action.payload);

      if (company) {
        state.currentCompany = {
          ...company,
        };
      } else {
        state.currentCompany = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload;
        if (state.companies.length > 0 && !state.currentCompany) {
          state.currentCompany = state.companies[0];
        }
      } )
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }
    );
  },
});

export const { companiesAdded, currentCompanySelected } = companiesSlice.actions;

export const selectAllCompanies = (state) => state.companies.companies;

export const selectCompanyById = (state, companyId) => state.companies.companies.find((company) => company.id === companyId);

export default companiesSlice.reducer;