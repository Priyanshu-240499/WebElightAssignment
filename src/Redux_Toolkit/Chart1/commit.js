import { createSlice } from "@reduxjs/toolkit";
const chart1commit = createSlice({
  name: "chart1commit",
  initialState: [],
  reducers: {
    setchart1commit(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart1commit.reducer;
export const {setchart1commit}=chart1commit.actions;