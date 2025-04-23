import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//import client from '../../utils/axiosInstance';
import api from '../../api/api';
/*const initialState = {
  companies: [],
  currentCompany: null,
};*/

const initialState = {
  companies: [],
  companiesMultiUser: [],
  activeCompanies: [],
  currentCompany: null,
  drop: null,
  status: 'idle',
  error: null,
};


export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({idUser}) => {
      const { data } = await api.get(`companias/MultiCompani/${idUser}`);
    return data;
  }
);

export const fetchActiveCompany = createAsyncThunk(
    'companies/fetchActiveCompany',
    async ({ idUser }) => {
      const { data } = await api.get(`Company/active-companies/${idUser}`);
      return data;
    }
  );
  
  /*
  export const fetchCompanyMultiUser = createAsyncThunk(
    'company/fetchCompanyMultiUser',
    async ({ idUser }) => {
      const { data } = await client.get(`companias/MultiCompani/${idUser}`);
      return data;
    }
  );*/
  

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    currentCompanySelected(state, action) {
      const company = state.activeCompanies.find((c) => c.id === action.payload);
      console.log(company)
      state.currentCompany = company || null;
    },
    setDrop(state, action) {
      state.drop = action.payload;
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
    builder
      .addCase(fetchActiveCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActiveCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeCompanies = action.payload;
      })
      .addCase(fetchActiveCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { currentCompanySelected, setDrop } = companiesSlice.actions;

export const selectAllCompanies = (state) => state.companies.companies;
export const selectCompanyById = (state, companyId) => state.companies.companies.find((company) => company.id === companyId);
export const selectActiveCompanies = (state) => state.companies.activeCompanies;
export const selectCurrentCompany = (state) => state.companies.currentCompany;
export const selectDrop = (state) => state.companies.drop;

export default companiesSlice.reducer;