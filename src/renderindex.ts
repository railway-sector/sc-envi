import * as am5 from "@amcharts/amcharts5";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import Query from "@arcgis/core/rest/support/Query";
import * as am5xy from "@amcharts/amcharts5/xy";

//--- Reset queryc
export function resetQuerc(queryc: any) {
  queryc.qExpression = undefined;
  queryc.q2Expression = undefined;
  queryc.status = undefined;
  queryc.statusField = undefined;
  queryc.chartCategory = undefined;
  queryc.chartCategoryField = undefined;
}

//--------------------------------//
//    Responve Chart function     //
//--------------------------------//
export function responsiveChartColumn(chart: any, legend: any) {
  chart.onPrivate("width", (width: any) => {
    const availableSpace = width * 0.35; // original 0.7
    const new_fontSize = width / 35;

    legend.labels.template.setAll({
      fill: am5.color("#ffffff"),
      fontSize: new_fontSize,
    });

    legend.itemContainers.template.setAll({
      width: availableSpace,
      marginLeft: 5,
      marginRight: 5,
    });
  });
}

//--------------------------------//
//    Define parameter types      //
//--------------------------------//
type StatusTypeNamesType =
  | "To be Constructed"
  | "Under Construction"
  | "delayed"
  | "Completed"
  | "Exceeded"
  | "Normal";

type StatusStateType =
  | "comp"
  | "incomp"
  | "ongoing"
  | "delayed"
  | "exceeded"
  | "normal";

//--- Shared ArcGIS/query context
interface BaseQueryContext {
  layers: any;
  qChart: any;
  view: any;
  chartCategoryTypes: any;
  chartCategoryTypeField: any;
  statusArray: any;
  statusField: any;
  revit: boolean;
}

//--- Core amCharts objects
interface ChartCore {
  root: any;
  chart: any;
  data: any;
}

//--- Status name lookups (arrays, used only at the top-level chart)
interface StatusNames {
  statusTypename: StatusTypeNamesType[];
  statusStatename: StatusStateType[];
}

//--- Series visual styling
interface SeriesStyle {
  seriesStatusColor: any;
  strokeColor: any;
  strokeWidth: any;
}

//--- Axis/icon layout styling
interface AxisIconStyle {
  new_chartIconSize: any;
  new_axisFontSize: any;
  chartIconPositionX?: any;
  chartPaddingRightIconLabel: any;
}

//--- Composed interfaces
interface chartColumnType
  extends BaseQueryContext, ChartCore, StatusNames, SeriesStyle, AxisIconStyle {
  legend: any;
  updateChartPanelwidth: any;
}

interface makeSeriesColumnType
  extends BaseQueryContext, ChartCore, SeriesStyle {
  statusType: string;
  statusState: string;
  xAxis: any;
  yAxis: any;
  legend: any;
  new_axisFontSize: any;
}

interface clickSeriesColumnType extends BaseQueryContext {
  series: any;
  statusState: any;
}

interface AxisRenderTypes extends ChartCore, AxisIconStyle {}

//--------------------------------//
//         Axis Renderer          //
//--------------------------------//
async function axisRender({
  root,
  data,
  chart,
  new_chartIconSize,
  chartIconPositionX,
  chartPaddingRightIconLabel,
  new_axisFontSize,
}: AxisRenderTypes) {
  const yRenderer = am5xy.AxisRendererY.new(root, {
    inversed: true,
  });

  //--- yAxis
  const yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer,
      bullet: function (root: any, _axis: any, dataItem: any) {
        return am5xy.AxisBullet.new(root, {
          location: 0.5,
          sprite: am5.Picture.new(root, {
            width: new_chartIconSize,
            height: new_chartIconSize,
            centerY: am5.p50,
            centerX: am5.p50,
            x: chartIconPositionX ?? 0,
            src: dataItem.dataContext.icon,
          }),
        });
      },
      tooltip: am5.Tooltip.new(root, {}),
    }),
  );

  yRenderer.labels.template.setAll({
    paddingRight: chartPaddingRightIconLabel,
  });

  yRenderer.grid.template.setAll({
    location: 1,
  });

  yAxis.get("renderer").labels.template.setAll({
    oversizedBehavior: "wrap",
    textAlign: "center",
    fill: am5.color("#ffffff"),
    //maxWidth: 150,
    fontSize: new_axisFontSize,
  });
  yAxis.data.setAll(data);

  //--- xAxix
  const xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      min: 0,
      max: 100,
      strictMinMax: true,
      numberFormat: "#'%'",
      calculateTotals: true,
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0,
        strokeWidth: 1,
        stroke: am5.color("#ffffff"),
      }),
    }),
  );

  xAxis.get("renderer").labels.template.setAll({
    textAlign: "center",
    fill: am5.color("#ffffff"),
    fontSize: new_axisFontSize,
  });

  return { xAxis, yAxis };
}

//--------------------------------//
//    Make Stacked Column         //
//--------------------------------//
export function makeSeriesColumn({
  layers,
  root,
  chart,
  data,
  qChart,
  chartCategoryTypes,
  chartCategoryTypeField,
  statusType,
  statusState,
  statusArray,
  statusField,
  xAxis,
  yAxis,
  legend,
  new_axisFontSize,
  seriesStatusColor,
  strokeColor,
  strokeWidth,
  view,
  revit,
  buildingLayer,
  setSublayerViewFilter,
  highlightedSublayerView,
}: makeSeriesColumnType & BuildingSublayerView) {
  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: statusType,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      baseAxis: yAxis,
      valueXField: statusState,
      valueXShow: "valueXTotalPercent",
      categoryYField: "category",
      fill:
        statusState === "incomp"
          ? am5.color(seriesStatusColor[0])
          : statusState === "comp"
            ? am5.color(seriesStatusColor[3])
            : statusState === "exceeded"
              ? am5.color("#FF0000")
              : statusState === "normal"
                ? am5.color("#000000")
                : am5.color(seriesStatusColor[1]),
      stroke: am5.color(strokeColor),
    }),
  );

  series.columns.template.setAll({
    fillOpacity: statusState === "comp" ? 1 : 0.5,
    tooltipText: "{name}: {valueX}", // "{categoryY}: {valueX}",
    tooltipY: am5.percent(90),
    strokeWidth: strokeWidth,
  });
  series.data.setAll(data);

  series.appear();

  series.bullets.push(() => {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text:
          statusState === "incomp"
            ? ""
            : "{valueXTotalPercent.formatNumber('#.')}%", //"{valueX}",
        fill: root.interfaceColors.get("alternativeText"),
        opacity: statusState === "incomp" ? 0 : 1,
        fontSize: new_axisFontSize,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true,
      }),
    });
  });

  //--------------------------------//
  //    Click Stacked Column        //
  //--------------------------------//
  clickSeriesColumn({
    layers,
    series,
    qChart,
    statusState,
    statusArray,
    view,
    chartCategoryTypes,
    chartCategoryTypeField,
    statusField,
    revit,
    buildingLayer,
    setSublayerViewFilter,
    highlightedSublayerView,
  });

  legend.data.push(series);
}

//--- Click event on series
export function clickSeriesColumn({
  layers,
  series,
  qChart,
  statusState,
  statusArray,
  view,
  chartCategoryTypes, // [{category: 'A', value: 3}]
  chartCategoryTypeField,
  statusField,
  revit,
  buildingLayer,
  setSublayerViewFilter,
  highlightedSublayerView,
}: clickSeriesColumnType & BuildingSublayerView) {
  series.columns.template.events.on("click", (ev: any) => {
    const selected: any = ev.target.dataItem?.dataContext;
    const categorySelected = chartCategoryTypes.find(
      (emp: any) => emp.category === selected.category,
    ).value;

    //--- Add to query expression
    qChart.chartCategory = categorySelected;
    qChart.chartCategoryType = typeof categorySelected;
    qChart.chartCategoryField = chartCategoryTypeField;
    qChart.status = statusArray.find(
      (item: any) => item.status === statusState,
    ).value;
    qChart.statusField = statusField;

    //--- Highlight layers based on the query
    if (revit) {
      //--- Building Scene Layer (sublayers)
      const selectedSublayerName = chartCategoryTypes.find(
        (emp: any) => emp.value === categorySelected,
      )?.modelName;

      highlightFilterBuildingSublayerView({
        layer: buildingLayer,
        layers,
        chartCategoryTypes,
        categorySelected,
        qChart,
        sublayerNames: selectedSublayerName,
        view,
        setLayerViewFilter: setSublayerViewFilter,
        highlightedSublayerView: highlightedSublayerView,
      });
    } else {
      //--- Scene Layer or Feature Layer
      for (const layer of layers) {
        highlightFilterLayerView({
          layer: layer,
          view: view,
          qChart: qChart,
        });
      }
    }
  });
}

//-------------------------------------//
//             LayverView              //
//-------------------------------------//
//--- Scene Layer or Feature Layer
type layerViewQueryProps = {
  layer?: any;
  qExpression?: any;
  view?: any;
  qChart: any;
};

export const highlightFilterLayerView = async ({
  layer,
  view,
  qChart,
}: layerViewQueryProps) => {
  const query = layer.createQuery();
  const qe = qChart.queryExpression();
  query.where = qe;
  let highlightSelect: any;

  const layerView = await view?.whenLayerView(layer);
  const results = await layer?.queryObjectIds(query);

  const queryExt = new Query({ objectIds: results });
  const qExtResult = await layer?.queryExtent(queryExt);
  if (qExtResult?.extent) {
    view?.goTo(qExtResult.extent);
  }

  highlightSelect && highlightSelect.remove();
  highlightSelect = layerView.highlight(results);

  layerView.filter = new FeatureFilter({ where: qe });
  view?.on("click", () => {
    layerView.filter = new FeatureFilter({
      where: undefined,
    });

    //-- Reset query properties & remove highlight
    resetQuerc(qChart);
    highlightSelect && highlightSelect.remove();
  });
};

//--- Building Scene Layer
interface BuildingSublayerView extends layerViewQueryProps {
  buildingLayer?: any;
  layers?: any;
  chartCategoryTypes?: any;
  categorySelected?: any;
  sublayerNames?: any;
  setLayerViewFilter?: any;
  highlightedSublayerView?: any;
  setSublayerViewFilter?: any;
}

export const sublayersQuery = ({
  layers,
  chartCategoryTypes,
  categorySelected,
  qChart,
}: BuildingSublayerView) => {
  const modelNameSelected = chartCategoryTypes.find(
    (item: any) => item.value === categorySelected,
  )?.modelName;

  const qe = qChart.queryExpression();

  if (!modelNameSelected) {
    // 'Others'
    layers.map((sublayer: any) => {
      sublayer.layer.definitionExpression = qe;
      sublayer.layer.visible = true;
    });
  } else {
    layers.map((sublayer: any) => {
      if (sublayer.name === modelNameSelected) {
        sublayer.layer.definitionExpression = qe;
        sublayer.layer.visible = true;
      } else {
        sublayer.layer.visible = false;
      }
    });
  }
};

export const highlightFilterBuildingSublayerView = async ({
  layer,
  layers,
  chartCategoryTypes,
  categorySelected,
  qChart,
  sublayerNames,
  view,
  setLayerViewFilter, // useState
  highlightedSublayerView,
}: BuildingSublayerView) => {
  const layerView = await view?.whenLayerView(layer);

  //--- Create sublayerview
  const sublayerView = layerView?.sublayerViews.find((sublayerView: any) => {
    return sublayerView.sublayer.modelName === sublayerNames;
  });

  //--- (Optional) Query sublayerView to higlight
  try {
    const query = sublayerView.createQuery();
    const result = await sublayerView?.queryObjectIds(query);

    highlightedSublayerView.current = sublayerView.highlight(result);
    sublayerView.filter = new FeatureFilter({
      where: qChart.queryExpression(),
    });
  } catch (error) {
    console.log("Forced deactivation of higilght sublayerView..");
  }

  setLayerViewFilter(sublayerView); // what is this?

  //--- Filter sublayers
  sublayersQuery({
    layers,
    chartCategoryTypes,
    categorySelected,
    qChart,
  });

  //--- Reset sublayerView
  if (sublayerView) {
    highlightedSublayerView.current && highlightedSublayerView.current.remove();
    sublayerView.filter = new FeatureFilter({
      where: undefined,
    });
  }
};

//--------------------------------//
//    Main Renderer function      //
//--------------------------------//
class ChartStackColumnRender implements chartColumnType, BuildingSublayerView {
  revit!: boolean;
  layers: any;
  root: any;
  chart: any;
  data: any;
  buildingLayer?: any;
  qChart: any;
  chartCategoryTypes: any;
  chartCategoryTypeField: any;
  statusTypename: StatusTypeNamesType[];
  statusStatename: StatusStateType[];
  statusArray: any;
  statusField: any;
  seriesStatusColor: any;
  strokeColor: any;
  strokeWidth: any;
  view: any;
  setLayerViewFilter?: any;
  new_chartIconSize: any;
  new_axisFontSize: any;
  chartIconPositionX?: any;
  chartPaddingRightIconLabel: any;
  legend: any;
  updateChartPanelwidth: any;

  constructor(
    revit: boolean,
    layers: any,
    root: any,
    chart: any,
    data: any,
    buildingLayer: any,
    qChart: any,
    chartCategoryTypes: any,
    chartCategoryTypeField: any,
    statusTypename: StatusTypeNamesType[],
    statusStatename: StatusStateType[],
    statusArray: any,
    statusField: any,
    seriesStatusColor: any,
    strokeColor: any,
    strokeWidth: any,
    view: any,
    setLayerViewFilter: any,
    new_chartIconSize: any,
    new_axisFontSize: any,
    chartIconPositionX: any,
    chartPaddingRightIconLabel: any,
    legend: any,
    updateChartPanelwidth: any,
  ) {
    this.revit = revit;
    this.layers = layers;
    this.root = root;
    this.chart = chart;
    this.data = data;
    this.buildingLayer = buildingLayer;
    this.qChart = qChart;
    this.chartCategoryTypes = chartCategoryTypes;
    this.chartCategoryTypeField = chartCategoryTypeField;
    this.statusTypename = statusTypename;
    this.statusStatename = statusStatename;
    this.statusArray = statusArray;
    this.statusField = statusField;
    this.seriesStatusColor = seriesStatusColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.view = view;
    this.setLayerViewFilter = setLayerViewFilter;
    this.new_chartIconSize = new_chartIconSize;
    this.new_axisFontSize = new_axisFontSize;
    this.chartIconPositionX = chartIconPositionX;
    this.chartPaddingRightIconLabel = chartPaddingRightIconLabel;
    this.legend = legend;
    this.updateChartPanelwidth = updateChartPanelwidth;
  }

  chartRendererColumn = async (): Promise<any> => {
    //--- Axis Renderer
    const xyAxis = await axisRender({
      root: this.root,
      data: this.data,
      chart: this.chart,
      new_chartIconSize: this.new_chartIconSize,
      chartIconPositionX: this.chartIconPositionX,
      chartPaddingRightIconLabel: this.chartPaddingRightIconLabel,
      new_axisFontSize: this.new_axisFontSize,
    });

    //--- Responsive Chart
    responsiveChartColumn(this.chart, this.legend);
    this.chart.onPrivate("width", (width: any) => {
      this.updateChartPanelwidth(width);
    });

    //--- Make Series
    this.statusTypename &&
      this.statusTypename.map((statustype: StatusTypeNamesType, index: any) => {
        makeSeriesColumn({
          layers: this.layers,
          root: this.root,
          chart: this.chart,
          data: this.data,
          qChart: this.qChart,
          chartCategoryTypes: this.chartCategoryTypes,
          chartCategoryTypeField: this.chartCategoryTypeField,
          statusType: statustype,
          statusState: this.statusStatename[index],
          statusArray: this.statusArray,
          statusField: this.statusField,
          xAxis: xyAxis.xAxis,
          yAxis: xyAxis.yAxis,
          legend: this.legend,
          new_axisFontSize: this.new_axisFontSize,
          seriesStatusColor: this.seriesStatusColor,
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          view: this.view,
          revit: this.revit,
          buildingLayer: this.buildingLayer,
          setSublayerViewFilter: this.setLayerViewFilter,
          highlightedSublayerView: this.chartPaddingRightIconLabel,
        });
      });
  };
}

export default ChartStackColumnRender;
