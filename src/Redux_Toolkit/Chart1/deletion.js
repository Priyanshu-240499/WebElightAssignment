import { createSlice } from "@reduxjs/toolkit";
const chart1del = createSlice({
  name: "chart1del",
  initialState: [],
  reducers: {
    setchart1del(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart1del.reducer;
export const {setchart1del}=chart1del.actions;