import { createSlice } from "@reduxjs/toolkit";
const chart2add = createSlice({
  name: "chart2add",
  initialState: [],
  reducers: {
    setchart2add(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart2add.reducer;
export const {setchart2add}=chart2add.actions;