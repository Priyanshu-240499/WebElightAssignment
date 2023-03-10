import { configureStore } from "@reduxjs/toolkit";
import userData from "../userData";
import Chart1 from "../Chart1/chart1";
import chart1commit from "../Chart1/commit"
import chart1add from "../Chart1/addition"
import chart1del from "../Chart1/deletion"
import chart2 from "../Chart2/chart2"
import chart2commit from "../Chart2/commit2"
import chart2add from "../Chart2/addition2"
import chart2del from "../Chart2/deletetion2"
const store = configureStore({
  reducer: {
    userData: userData,
    Chart1:Chart1,
    chart1commit:chart1commit,
    chart1add:chart1add,
    chart1del:chart1del,
    chart2:chart2,
    chart2commit:chart2commit,
    chart2add:chart2add,
    chart2del:chart2del,

  }
});
export default store;