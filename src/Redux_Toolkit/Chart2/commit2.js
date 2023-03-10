import { createSlice } from "@reduxjs/toolkit";
const chart2commit = createSlice({
  name: "chart2commit",
  initialState: [],
  reducers: {
    setchart2commit(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart2commit.reducer;
export const {setchart2commit}=chart2commit.actions;