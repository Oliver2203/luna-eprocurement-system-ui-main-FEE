import { createSlice } from '@reduxjs/toolkit';
import { fetchMemberList } from '../actions/memberListAction';

const initialState = {
  loading: false,
  memberList: null,
  success: false,
  error: null,
};

export const memberList = createSlice({
  name: 'memberList',
  initialState,
  reducers: {
    setMemberList: (state, action) => (state.memberList = action.payload),
    changeMemberDepartment: (state, action) => {
      const { email, departmentName, departmentCode } = action.payload;

      state.memberList = state.memberList.map((member) => {
        if (member.email === email) {
          return {
            ...member,
            departmentCode,
            departmentName,
          };
        }
        return member;
      });
    },
    changeMemberTeam: (state, action) => {
      const { email, teamName, teamCode } = action.payload;

      state.memberList = state.memberList.map((member) => {
        if (member.email === email) {
          return {
            ...member,
            teamCode,
            teamName,
          };
        }
        return member;
      });
    },
    changeMemberRole: (state, action) => {
      const { email, role } = action.payload;

      state.memberList = state.memberList.map((member) => {
        if (member.email === email) {
          return {
            ...member,
            role,
          };
        }
        return member;
      });
    },
    deleteMember: (state, action) => {
      const email = action.payload;
      state.memberList = state.memberList.filter((user) => user.email !== email);
    },
    resetMemberList: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Case for fetch user list
      .addCase(fetchMemberList.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchMemberList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.memberList = action.payload;
      })
      .addCase(fetchMemberList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMemberList, deleteMember, changeMemberTeam, changeMemberDepartment, changeMemberRole } =
  memberList.actions;
export default memberList.reducer;
