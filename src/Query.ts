import { dateTable, monitorPointLayer } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where =
    "project = 'SC'" + " AND " + "category = 'Environment Monitoring'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

const monitoringStatus = [
  "Noise",
  "Vibration",
  "Air Quality",
  "Soil Water",
  "Groundwater",
  "Surface Water",
];

export async function generateChartData() {
  const total_noise_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_noise_exceed",
    statisticType: "sum",
  });

  const total_noise_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 1 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_noise_normal",
    statisticType: "sum",
  });

  const total_vibration_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_vibration_exceed",
    statisticType: "sum",
  });

  const total_vibration_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 2 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_vibration_normal",
    statisticType: "sum",
  });
  const total_air_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_air_exceed",
    statisticType: "sum",
  });

  const total_air_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 3 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_air_normal",
    statisticType: "sum",
  });
  const total_soil_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_soil_exceed",
    statisticType: "sum",
  });

  const total_soil_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 4 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_soil_normal",
    statisticType: "sum",
  });
  const total_gwater_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_gwater_exceed",
    statisticType: "sum",
  });

  const total_gwater_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 5 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_gwater_normal",
    statisticType: "sum",
  });
  const total_swater_exceed = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 3) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_swater_exceed",
    statisticType: "sum",
  });

  const total_swater_normal = new StatisticDefinition({
    onStatisticField: "CASE WHEN (Type = 6 and Status = 2) THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_swater_normal",
    statisticType: "sum",
  });

  const query = monitorPointLayer.createQuery();
  query.outStatistics = [
    total_noise_exceed,
    total_noise_normal,
    total_vibration_exceed,
    total_vibration_normal,
    total_air_exceed,
    total_air_normal,
    total_soil_exceed,
    total_soil_normal,
    total_gwater_exceed,
    total_gwater_normal,
    total_swater_exceed,
    total_swater_normal,
  ];
  query.returnGeometry = true;

  return monitorPointLayer.queryFeatures(query).then((response: any) => {
    const stats = response.features[0].attributes;
    const noise_exceed = stats.total_noise_exceed;
    const noise_normal = stats.total_noise_normal;
    const vibration_exceed = stats.total_vibration_exceed;
    const vibration_normal = stats.total_vibration_normal;
    const air_exceed = stats.total_air_exceed;
    const air_normal = stats.total_air_normal;
    const soil_exceed = stats.total_soil_exceed;
    const soil_normal = stats.total_soil_normal;
    const gwater_exceed = stats.total_gwater_exceed;
    const gwater_normal = stats.total_gwater_normal;
    const swater_exceed = stats.total_swater_exceed;
    const swater_normal = stats.total_swater_normal;

    const data = [
      {
        category: monitoringStatus[0],
        normal: noise_normal,
        exceed: noise_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Noise_Logo.png",
      },
      {
        category: monitoringStatus[1],
        normal: vibration_normal,
        exceed: vibration_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Vibration_Logo.png",
      },
      {
        category: monitoringStatus[2],
        normal: air_normal,
        exceed: air_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Air_Quality_Logo.png",
      },
      {
        category: monitoringStatus[3],
        normal: soil_normal,
        exceed: soil_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Soil_Water_Logo.png",
      },
      {
        category: monitoringStatus[4],
        normal: gwater_normal,
        exceed: gwater_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Groundwater_Logo.png",
      },
      {
        category: monitoringStatus[5],
        normal: swater_normal,
        exceed: swater_exceed,
        icon: "https://EijiGorilla.github.io/Symbols/Water_drop.png",
      },
    ];
    return data;
  });
}

export async function generateTotalNumber() {
  const total_monitor_number = new StatisticDefinition({
    onStatisticField: "StationNo",
    outStatisticFieldName: "total_monitor_number",
    statisticType: "count",
  });

  const total_exceed_number = new StatisticDefinition({
    onStatisticField: "CASE WHEN Status = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_exceed_number",
    statisticType: "sum",
  });

  const query = monitorPointLayer.createQuery();
  query.outStatistics = [total_monitor_number, total_exceed_number];
  query.returnGeometry = true;

  return monitorPointLayer.queryFeatures(query).then((response: any) => {
    const stats = response.features[0].attributes;
    const totalNumber = stats.total_monitor_number;
    const totalExceed = stats.total_exceed_number;

    return [totalNumber, totalExceed];
  });
}

export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}
