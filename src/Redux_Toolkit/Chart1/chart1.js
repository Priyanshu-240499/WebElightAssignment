import { createSlice } from "@reduxjs/toolkit";
const chart1 = createSlice({
  name: "chart1",
  initialState: [],
  reducers: {
    setchartdata(state, action) {
      return (state = action.payload);
    }
  }
});
export default chart1.reducer;
export const {setchartdata}=chart1.actions;
