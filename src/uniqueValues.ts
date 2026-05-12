export const primaryLabelColor = "#d1d5db";
export const valueLabelColor = "#d1d5db";

export const chartCategoryField = "Type";
export const statusField = "Status";

//------
export type TypeFieldType = "number" | "string";
export type StatusTypenamesType = "No Data" | "Normal" | "Exceeded";

export type StatusStateType = "exceeded" | "normal" | "nodata";
export const monitoringCategoryLabels = [
  "Noise",
  "Vibration",
  "Air Quality",
  "Soil Water",
  "Groundwater",
  "Surface Water",
];

export const monitoringStatusValues = [1, 2, 3, 4, 5, 6];
export const monitoringStatusColor = ["#FF0000", "#000000", "#666363"];
export const icons = [
  "https://EijiGorilla.github.io/Symbols/Noise_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Vibration_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Air_Quality_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Soil_Water_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Groundwater_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Water_drop.png",
];

export const monitoringTypes = monitoringCategoryLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: monitoringStatusValues[index],
      icon: icons[index],
    });
  },
);

// Layter list
export async function defineActions(event: any) {
  const { item } = event;

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Chainage" ? (item.visible = false) : (item.visible = true);
}
