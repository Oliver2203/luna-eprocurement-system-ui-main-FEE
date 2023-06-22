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

export const { addDepartment, addTeam } = entitySlice.actions;
export default entitySlice.reducer;
