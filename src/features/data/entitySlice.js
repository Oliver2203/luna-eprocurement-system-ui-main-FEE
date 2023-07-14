import { createSlice } from '@reduxjs/toolkit';
import { fetchEntityInfo } from '../actions/entityAction';

const initialState = {
  loading: false,
  entity: null,
  error: null,
  success: false,
};

const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      state.entity.departments.push(action.payload);
    },
    addTeam: (state, action) => {
      const department = state.entity.departments.find((item) => item.departmentCode === action.payload.departmentCode);

      if (department) {
        department.teams.push({
          teamName: action.payload.name,
          teamCode: action.payload.code,
        });
      }
    },
    removeDepartment: (state, action) => {
      const { departmentCode } = action.payload;
      state.entity.departments = state.entity.departments.filter((item) => item.departmentCode !== departmentCode);
    },
  },
  extraReducers: (builder) => {
    builder
      // Case for Fetch Department List
      .addCase(fetchEntityInfo.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchEntityInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.entity = action.payload;
      })
      .addCase(fetchEntityInfo.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { addDepartment, addTeam, removeDepartment } = entitySlice.actions;
export default entitySlice.reducer;
