import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
  name: "userData",
  initialState: [],
  reducers: {
    setuserData(state, action) {
      return (state = [...state, ...action.payload]);
    }
  }
});

export default userData.reducer;
export const { setuserData } = userData.actions;
