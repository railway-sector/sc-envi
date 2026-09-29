/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from "react";
import { monitorPointLayer } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { thousands_separators } from "../query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import { status_f, status_q, type_f, types_q } from "../uniqueValues";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { legendSetter, rootSetter } from "../chartSetter";
import type { ChartResponse } from "../interfaceKeys";
import ChartStackColumnRender from "chart-stack-column-render";
import ChartStackColumns from "chart-stack-column";
import QueryExpressionLayers from "query-layers-expression";

//----------------------------//
//       useEnviData          //
//----------------------------//

const Chart = () => {
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const rendererRef = useRef<ChartStackColumnRender | null>(null);
  const chartID = "monitoring-bar";

  const q1 = new QueryExpressionLayers({});

  const { data } = useQuery<ChartResponse | any>({
    queryKey: [status_f, monitorPointLayer, type_f, types_q],
    queryFn: async () => {
      //--- chart data
      const chartData = await new ChartStackColumns({
        where: q1,
        categoryTypes: types_q,
        categoryTypeField: type_f,
        layers: [monitorPointLayer],
        statusField: status_f,
        statusState: [1, 2, 3, 4],
      }).chartDataStackColumns();

      let totale = 0;
      const arr = chartData[0].map(
        (item: any) => (
          (totale += item.delayed),
          {
            category: item.category,
            exceeded: item.delayed,
            normal: item.ongoing,
            nodata: item.incomp,
            icon: item.icon,
          }
        ),
      );

      return {
        chartData: arr || [],
        totaln: chartData[1] || 0,
        totale: totale,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
  const chartData = data?.chartData || [];
  const totaln = data?.totaln || 0;
  const totale = data?.totale || 0;

  // Define parameters
  const marginTop = 0;
  const marginLeft = 0;
  const marginRight = 0;
  const marginBottom = 0;
  const paddingTop = 10;
  const paddingLeft = 5;
  const paddingRight = 5;
  const paddingBottom = 0;
  const chartIconPositionX = -21;
  const chartPaddingRightIconLabel = 45;
  const chartBorderLineColor = "#00c5ff";
  const chartBorderLineWidth = 0.4;

  const fontSize = chartPanelwidth / 20;
  const valueSize = fontSize * 1.7;
  const chartIconSize = chartPanelwidth * 0.07;
  const axisFontSize = chartPanelwidth * 0.036;
  const imageSize = chartPanelwidth * 0.053;

  //--- Keep click-handler-relevant values fresh without rebuilding the
  //    chart. view lives here too (not passed statically to the
  //    renderer) since arcgis-scene's view may not be ready on first
  //    mount.
  const configBaseArgs = {
    revit: false,
    layers: [monitorPointLayer],
    buildingLayer: undefined,
    chartCategoryTypeField: type_f,
    where: q1,
    status_field: status_f,
    view: arcgisScene?.view,
  };

  const configRef = useRef({ ...configBaseArgs });
  useEffect(() => {
    configRef.current = { ...configBaseArgs };
  }, [data, status_f, arcgisScene]);

  //---  Column Chart Renderer — created ONCE (mount only)
  useEffect(() => {
    const root = rootSetter({ chartID: chartID });
    root.setThemes([]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        marginTop: marginTop,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingBottom: paddingBottom,
        scale: 1,
        height: am5.percent(100),
      }),
    );
    chartRef.current = chart;

    const legend = legendSetter({
      chart,
      root,
      centerX: 50,
      centerY: 50,
      x: 60,
      y: 97,
      marginTop: 20,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    //--- NOTE: no `view` here — it's read live from configRef.current
    //    inside chartrender.ts, since arcgis-scene may not have a
    //    ready `.view` yet at this point.
    const renderer = new ChartStackColumnRender({
      root,
      chart,
      data: [],
      configRef,
      chartCategoryTypes: types_q,
      statusTypename: ["Exceeded", "Normal"],
      statusStatename: ["exceeded", "normal"],
      statusArray: status_q,
      seriesStatusColor: status_q.map((c: any) => c.color),
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      chartIconSize,
      axisFontSize,
      chartIconPositionX,
      chartPaddingRightIconLabel,
      legend,
      updateChartPanelwidth: setChartPanelwidth,
    });
    rendererRef.current = renderer;
    renderer.chartRendererColumn();

    return () => {
      root.dispose();
      rendererRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //--- Push new data / inner value / affected-area figures into the
  //    already-mounted chart. No dispose, no rebuild -> no blink.
  //    NOTE: affectedAreaValue is NOT called here directly — it's
  //    registered once inside chartrender.ts and reads live data via
  //    closures, which updateData() keeps in sync. Calling it here on
  //    every render would both miss the first paint and stack
  //    duplicate adapters.
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer || !chartPanelwidth) return; // wait for a real width

    //--- Sizes are captured at construction, so refresh them here
    renderer.chartIconSize = chartIconSize;
    renderer.axisFontSize = axisFontSize;

    renderer.updateData(chartData);
  }, [chartData, chartPanelwidth]);
  const primaryLabelColor = "#9ca3af";
  const valueLabelColor = "#d1d5db";

  return (
    <>
      <div
        slot="panel-end"
        style={{
          width: "35%",
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderColor: "#555555",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "3px",
            marginLeft: "15px",
            marginRight: "15px",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <img
            src={
              totale > 0
                ? "https://EijiGorilla.github.io/Symbols/3D_Web_Style/Warning_Symbol.svg"
                : "https://EijiGorilla.github.io/Symbols/DemolishComplete_v2.png"
            }
            alt="Land Logo"
            height={`${imageSize}%`}
            width={`${imageSize}%`}
            style={{ paddingTop: "30px", paddingLeft: "15px" }}
          />
          <dl style={{ alignItems: "center", marginRight: "20px" }}>
            <dt
              style={{
                color: primaryLabelColor,
                fontSize: `${fontSize}px`,
              }}
            >
              TOTAL EXCEEDED
            </dt>
            <dd
              style={{
                color: valueLabelColor,
                fontSize: `${valueSize}px`,
                fontWeight: "bold",
                fontFamily: "calibri",
                lineHeight: "1.2",
                margin: "auto",
              }}
            >
              {thousands_separators(totale)}
            </dd>
            <div style={{ fontSize: `${valueSize}*0.5px` }}>
              ({thousands_separators(totaln)})
            </div>
          </dl>
        </div>

        <div
          id={chartID}
          style={{
            height: "70vh",
            backgroundColor: "rgb(0,0,0,0)",
            color: "white",
            marginRight: "10px",
            marginTop: "15px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Chart;
