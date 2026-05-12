import { createContext } from "react";

type MyDropdownContextType = {
  chartPanelwidth: any;
  updateChartPanelwidth: any;
};

const initialState = {
  chartPanelwidth: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
