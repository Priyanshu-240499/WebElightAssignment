import { createSlice } from "@reduxjs/toolkit";
const chart1add = createSlice({
  name: "chart1add",
  initialState: [],
  reducers: {
    setchart1add(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart1add.reducer;
export const {setchart1add}=chart1add.actions;