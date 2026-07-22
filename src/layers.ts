import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  chainage_renderer,
  label_chainage,
  label_stationp,
  labels,
  popup,
  portalItems,
  prow_renderer,
  renderer,
  stationbox_renderer,
} from "./uniqueValues";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 6,
  title: "SC Stations",
  labelingInfo: [label_stationp],
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

//--- CHAINAGE LAYER ---//
export const chainageLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 2,
  title: "Chainage",
  elevationInfo: { mode: "relative-to-ground" },
  labelingInfo: [label_chainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainage_renderer,
  popupEnabled: false,
});

//--- STATION BOX LAYER ---//
export const stationBoxLayer = new FeatureLayer({
  portalItem: portalItems("e09b9af286204939a32df019403ef438"),
  layerId: 7,
  renderer: stationbox_renderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",
  popupEnabled: false,
  elevationInfo: { mode: "on-the-ground" },
});

//--- PROW LAYER ---//
export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  layerId: 5,
  title: "PROW",
  popupEnabled: false,
  renderer: prow_renderer,
});

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [stationBoxLayer, chainageLayer, prowLayer],
});

//----------------------------------------------//
//                Other Layers                  //
//----------------------------------------------//
//--- DATES FEATURE TABLE ---//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("b2a118b088a44fa0a7a84acbe0844cb2"),
});

//--- MONNITORING POINT LAYER ---//
export const monitorPointLayer = new FeatureLayer({
  portalItem: portalItems("dfd0bca99c754002b55459004b684415"),
  layerId: 1,
  title: "Monitoring Indicators",
  elevationInfo: { mode: "relative-to-scene", unit: "meters" },
  outFields: ["*"],
  renderer: renderer,
  labelingInfo: [labels],
  popupTemplate: popup,
});
