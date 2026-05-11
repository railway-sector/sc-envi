import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D.js";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer.js";
import LineCallout3D from "@arcgis/core/symbols/callouts/LineCallout3D";
// import QueryExpressionLayers from "query-layers-expression";

// export const queryc = new QueryExpressionLayers(
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   "string",
//   0,
//   undefined,
//   undefined,
//   undefined,
// );

// export const queryc2 = new QueryExpressionLayers(
//   undefined,
//   undefined,
//   undefined,
//   undefined,
//   "string",
//   0,
//   undefined,
//   undefined,
//   undefined,
// );

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "b2a118b088a44fa0a7a84acbe0844cb2",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

/* Chainage Layer  */
const labelChainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: {
      size: 15,
      weight: "bold",
    },
  },
});

const chainageRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: {
      width: 0.2,
      color: "black",
    },
  }),
});

export const chainageLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 2,
  title: "Chainage",
  elevationInfo: {
    mode: "relative-to-ground",
  },
  labelingInfo: [labelChainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainageRenderer,
  // outFields: ['*'],
  popupEnabled: false,
});

/* Station Box */
const stationBoxRenderer = new UniqueValueRenderer({
  field: "Layer",
  uniqueValueInfos: [
    {
      value: "00_Platform",
      label: "Platform",
      symbol: new SimpleFillSymbol({
        color: [160, 160, 160],
        style: "backward-diagonal",
        outline: {
          width: 1,
          color: "black",
        },
      }),
    },
    {
      value: "00_Platform 10car",
      label: "Platform 10car",
      symbol: new SimpleFillSymbol({
        color: [104, 104, 104],
        style: "cross",
        outline: {
          width: 1,
          color: "black",
          style: "short-dash",
        },
      }),
    },
    {
      value: "00_Station",
      label: "Station Box",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2,
          color: [115, 0, 0],
        },
      }),
    },
  ],
});

export const stationBoxLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 7,
  renderer: stationBoxRenderer,
  minScale: 150000,
  maxScale: 0,
  title: "Station Box",
  // outFields: ['*'],
  popupEnabled: false,
  elevationInfo: {
    mode: "on-the-ground",
  },
});

/* ROW Layer */
const prowRenderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({
    color: "#ff0000",
    width: "2px",
  }),
});

export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/SC_Alignment/FeatureServer/5",
  title: "PROW",
  popupEnabled: false,
  renderer: prowRenderer,
});
prowLayer.listMode = "hide";

/* Station Layer */
const labelClass = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "#d4ff33",
        },
        size: 15,
        halo: {
          color: "black",
          size: 0.5,
        },
        font: {
          family: "Ubuntu Mono",
          //weight: "bold"
        },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: {
        color: "grey",
      },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Station",
    //value: "{TEXTSTRING}"
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "e09b9af286204939a32df019403ef438",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 6,
  title: "SC Stations",
  labelingInfo: [labelClass],
  elevationInfo: {
    mode: "relative-to-ground",
  },
});
stationLayer.listMode = "hide";

/* Monitoring points layer */

const verticalOffsetRelocation = {
  screenLength: 100,
  maxWorldLength: 500,
  minWorldLength: 10,
};

function getUniqueValueSymbol(name: string, color: any, sizeS: number) {
  return new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        resource: {
          href: name,
        },
        size: sizeS,
        outline: {
          color: color,
          size: 2,
        },
      }),
    ],

    verticalOffset: verticalOffsetRelocation,

    callout: new LineCallout3D({
      color: [128, 128, 128, 0.8],
      size: 0.2,
      border: {
        color: "grey",
      },
    }),
  });
}

const monitorStatusSymbolRenderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: [
    {
      value: 1,
      label: "No Data",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/No_Data_textLogo.png",
        "#D13470",
        20,
      ),
    },
    {
      value: 2,
      label: "Normal",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png",
        "#D13470",
        20,
      ),
    },
    {
      value: 3,
      label: "Exceeded",
      symbol: getUniqueValueSymbol(
        "https://EijiGorilla.github.io/Symbols/3D_Web_Style/Warning_Symbol.svg",
        "#D13470",
        20,
      ),
    },
  ],
});

const MonitorLabel = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: {
          color: "black",
        },
        size: 10,
        halo: {
          color: [255, 255, 255, 0.7],
          size: 2,
        },
      }),
    ],
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "DomainName($feature, 'Type')",
  },
});

export const monitorPointLayer = new FeatureLayer({
  portalItem: {
    id: "dfd0bca99c754002b55459004b684415",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  title: "Monitoring Indicators",
  elevationInfo: {
    mode: "relative-to-scene",
    unit: "meters",
    //offset: 0
  },
  outFields: ["*"],
  renderer: monitorStatusSymbolRenderer,
  labelingInfo: [MonitorLabel],
  popupTemplate: {
    title: "<h5>{Type}</h5>",
    lastEditInfoEnabled: false,
    returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "StationNo",
            label: "Station No.",
          },
          {
            fieldName: "Location",
          },
          {
            fieldName: "Status",
            label: "<h5>Status</h5>",
          },
          {
            fieldName: "Remarks",
          },
        ],
      },
    ],
  },
});
monitorPointLayer.listMode = "hide";

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [stationBoxLayer, chainageLayer, prowLayer],
});
