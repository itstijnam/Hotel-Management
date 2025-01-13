import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  staffProfile: null,
  staffDetail: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    setStaffProfile(state, action){
      state.staffProfile = action.payload
    },
    setStaffDetail(state,action){
      state.staffDetail = action.payload
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const { setAuthUser, logoutUser, setStaffProfile, setStaffDetail } = authSlice.actions;

export default authSlice.reducer;
