import { createSlice } from "@reduxjs/toolkit";
const chart2 = createSlice({
  name: "chart2",
  initialState: [],
  reducers: {
    setchart2data(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart2.reducer;
export const {setchart2data}=chart2.actions;
