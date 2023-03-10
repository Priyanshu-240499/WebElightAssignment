import { createSlice } from "@reduxjs/toolkit";
const chart2del = createSlice({
  name: "chart2del",
  initialState: [],
  reducers: {
    setchart2del(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart2del.reducer;
export const {setchart2del}=chart2del.actions;