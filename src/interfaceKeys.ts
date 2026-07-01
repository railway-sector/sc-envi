//--- Dropdown
export interface SelectedLocation {
  cpackage: string | any;
  company: string | any;
  utype: string | any;
}

export const locationKeys = {
  selected: ["selectedLocation"] as const,
};

//--- timeslider state type
export interface TimeSliderState {
  timesliderstate: boolean;
}

export const timesliderKeys = {
  selected: ["selectedTimesliderState"] as const,
};

//-- date fields
export interface DateFieldsType {
  dateFields: any;
  latestasofdate: any;
}

export const datefieldKeys = {
  selected: ["selectedDateFields"] as const,
};

//--- Dates for chart
export interface TimesliderFieldsTypes {
  statusdateField?: string | any;
  newHandedoverAreafield?: string | any;
  newAffectedAreafield?: string | any;
  newHandedOverfield?: string | any;
  dateforhandedover?: string | any;
}

export const timesliderFieldKeys = {
  selected: ["selectedTimesliderFields"] as const,
};

//-- Date for display
export interface DisplayDates {
  asOfDate: any;
}

export const dateDisplayKeys = {
  selected: ["displayDates"] as const,
};

//--- Chart
export interface ChartResponse {
  chartData: any[];
  totalNumber: number | string | undefined;
}
