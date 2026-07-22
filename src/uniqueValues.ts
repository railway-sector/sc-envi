//----------------------------------------------//
//              portalItem                      //

import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import ExtrudeSymbol3DLayer from "@arcgis/core/symbols/ExtrudeSymbol3DLayer";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import PolygonSymbol3D from "@arcgis/core/symbols/PolygonSymbol3D";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";

//----------------------------------------------//
const portalItem_url = { url: "https://gis.railway-sector.com/portal" };

export const portalItems = (id: any) => {
  return { id: id, portal: portalItem_url };
};

export const cpackages = [
  "All",
  "S-01",
  "S-02",
  "S-03a",
  "S-03b",
  "S-03c",
  "S-04",
  "S-05",
  "S-06",
  "S-07",
];

export const monitorLists = [
  "Land Acquisition",
  "Structure",
  "Non Land Owner",
  "Utility Relocation",
  "Trees",
  "Viaduct",
];

// Media parameters
export const image_scales = [1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];
export const img_size = 280;
export const timestamp_field = "timestamp";

//----------------------------------------------//
//              Chart Parameters                //
//----------------------------------------------//
export const chart_width = "26vw";
export const chart_box_width = 250;

export const construction_status = [
  "To be Constructed",
  "Under Construction",
  "Completed",
];

// Chart and chart label color
export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";

export const type_f = "Type";
export const status_f = "Status";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION LAYER ---//
export const label_stationp = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: "#d4ff33" },
        size: 15,
        halo: { color: "black", size: 0.5 },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line",
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: { color: "grey" },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "$feature.Station" },
});

//--- CHAINAGE LAYER ---//
export const label_chainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: { size: 15, weight: "bold" },
  },
});

export const chainage_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: { width: 0.2, color: "black" },
  }),
});

//--- STATION BOX LAYER ---//
export const stationbox_renderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: [
    {
      value: "00_Platform",
      label: "Platform",
      symbol: new SimpleFillSymbol({
        color: [160, 160, 160],
        style: "backward-diagonal",
        outline: { width: 1, color: "black" },
      }),
    },
    {
      value: "00_Platform 10car",
      label: "Platform 10car",
      symbol: new SimpleFillSymbol({
        color: [104, 104, 104],
        style: "cross",
        outline: { width: 1, color: "black", style: "short-dash" },
      }),
    },
    {
      value: "00_Station",
      label: "Station Box",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: { width: 2, color: [115, 0, 0] },
      }),
    },
  ],
});

//--- PIER HEAD & COLUMN LAYER ---//
const pHeight = 0;

const pier_column_symbol = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 10,
      material: { color: [78, 78, 78, 0.5] },
      edges: new SolidEdges3D({ color: "#4E4E4E", size: 0.3 }),
    }),
  ],
});

const pilecap_symbol = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: pHeight + 3,
      material: { color: [200, 200, 200, 0.7] },
      edges: new SolidEdges3D({ color: "#4E4E4E", size: 1.0 }),
    }),
  ],
});

export const pierhead_renderer = new UniqueValueRenderer({
  field: "Layer",
  legendOptions: { title: "Pile Cap/Column" },
  uniqueValueInfos: [
    { value: "Pier_Column", symbol: pier_column_symbol, label: "Column" },
    { value: "Pile_Cap", symbol: pilecap_symbol, label: "Pile Cap" },
  ],
});

//--- PROW LAYER ---//
export const prow_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({ color: "#ff0000", width: "2px" }),
});

//----------------------------------------------//
//          Environment Monitoring Layers       //
//----------------------------------------------//
export type TypeFieldType = "number" | "string";
export type StatusTypenamesType = "No Data" | "Normal" | "Exceeded";

export type StatusStateType =
  | "exceeded"
  | "normal"
  | "nodata"
  | "delayed"
  | "ongoing";

export const icons = [
  "https://EijiGorilla.github.io/Symbols/Noise_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Vibration_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Air_Quality_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Soil_Water_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Groundwater_Logo.png",
  "https://EijiGorilla.github.io/Symbols/Water_drop.png",
];

export const types_q = [
  { value: 1, category: "Noise", icon: icons[0] },
  { value: 2, category: "Vibration", icon: icons[1] },
  { value: 3, category: "Air Quality", icon: icons[2] },
  { value: 4, category: "Soil Water", icon: icons[3] },
  { value: 5, category: "Groundwater", icon: icons[4] },
  { value: 6, category: "Surface Water", icon: icons[5] },
];

export const status_icon = [
  "https://EijiGorilla.github.io/Symbols/No_Data_textLogo.png",
  "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
  "https://EijiGorilla.github.io/Symbols/3D_Web_Style/Warning_Symbol.svg",
];

export const status_q = [
  { value: 1, status: "nodata", color: "#666363", icon: status_icon[0] },
  { value: 2, status: "normal", color: "#000000", icon: status_icon[1] },
  { value: 3, status: "exceeded", color: "#FF0000", icon: status_icon[2] },
];

const v_offset = { screenLength: 100, maxWorldLength: 500, minWorldLength: 10 };

function getUniqueValueSymbol(name: string, color: any, sizeS: number) {
  return new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        resource: { href: name },
        size: sizeS,
        outline: { color: color, size: 2 },
      }),
    ],

    verticalOffset: v_offset,

    callout: new LineCallout3D({
      color: [128, 128, 128, 0.8],
      size: 0.2,
      border: { color: "grey" },
    }),
  });
}

const uniqueV = status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: getUniqueValueSymbol(f.icon, "#D13470", f.value == 1 ? 60 : 20),
  };
});

export const renderer = new UniqueValueRenderer({
  field: status_f,
  uniqueValueInfos: uniqueV,
});

export const labels = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: "black" },
        size: 10,
        halo: { color: [255, 255, 255, 0.7], size: 2 },
      }),
    ],
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "DomainName($feature, 'Type')" },
});

export const popup = {
  title: "<h5>{Type}</h5>",
  lastEditInfoEnabled: false,
  returnGeometry: true,
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "StationNo", label: "Station No." },
        { fieldName: "Location" },
        { fieldName: "Status", label: "<h5>Status</h5>" },
        { fieldName: "Remarks" },
      ],
    },
  ],
};

//----------------------------------------------//
//                     Layer List               //
//----------------------------------------------//
// Layter list
export async function defineActions(event: any) {
  const { item } = event;

  if (item.layer.type !== "group") {
    item.panel = { content: "legend", open: true };
  }

  item.title === "Chainage" ? (item.visible = false) : (item.visible = true);
}
