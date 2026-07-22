/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useRef, useState } from "react";
import { monitorPointLayer } from "../layers";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {
  makeQuery,
  stackColumnChartData,
  stackColumnChartRender,
  thousands_separators,
} from "../query";
import { ArcgisScene } from "@arcgis/map-components/dist/components/arcgis-scene";
import { status_f, status_q, type_f, types_q } from "../uniqueValues";
import { useQuery } from "@tanstack/react-query";
import { legendSetter, rootSetter } from "../chartSetter";
import type { ChartResponse } from "../interfaceKeys";
import ChartStackColumnRender from "chart-stack-column-render";
import ChartStackColumns from "chart-stack-column";

const Chart = () => {
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const arcgisScene = document.querySelector("arcgis-scene") as ArcgisScene;
  const legendRef = useRef<unknown | any | undefined>({});
  const chartRef = useRef<unknown | any | undefined>({});
  const chartID = "monitoring-bar";

  const queryc = makeQuery([undefined], [undefined]);

  const { data } = useQuery<ChartResponse | any>({
    queryKey: [status_f, monitorPointLayer, type_f, types_q],
    queryFn: async () => {
      //--- chart data
      const chartData = await stackColumnChartData({
        colchart: new ChartStackColumns(),
        qChart: queryc,
        categoryTypes: types_q,
        categoryTypeField: type_f,
        layers: [monitorPointLayer],
        statusField: status_f,
        statusState: [1, 2, 3, 4],
      });

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

  // ************************************
  //  Responsive Chart parameters
  // ***********************************
  const new_fontSize = chartPanelwidth / 20;
  const new_valueSize = new_fontSize * 1.7;
  const new_chartIconSize = chartPanelwidth * 0.07;
  const new_axisFontSize = chartPanelwidth * 0.036;
  const new_imageSize = chartPanelwidth * 0.053;

  useEffect(() => {
    const root = rootSetter({ chartID: chartID });
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
      chart: chart,
      root: root,
      centerX: 50,
      centerY: 50,
      x: 60,
      y: 97,
      marginTop: 20,
      layout: root.horizontalLayout,
    });
    legendRef.current = legend;

    //--- chart renderer
    stackColumnChartRender({
      render: new ChartStackColumnRender(),
      revit: false,
      layers: [monitorPointLayer],
      root,
      chart,
      data: chartData,
      buildingLayer: undefined,
      qChart: queryc,
      chartCategoryTypes: types_q,
      chartCategoryTypeField: type_f,
      statusTypename: ["Exceeded", "Normal"],
      statusStatename: ["exceeded", "normal"],
      statusArray: status_q,
      statusField: status_f,
      seriesStatusColor: status_q.map((c: any) => c.color),
      strokeColor: chartBorderLineColor,
      strokeWidth: chartBorderLineWidth,
      view: arcgisScene?.view,
      setLayerViewFilter: undefined,
      new_chartIconSize,
      new_axisFontSize,
      chartIconPositionX,
      chartPaddingRightIconLabel,
      legend,
      updateChartPanelwidth: setChartPanelwidth,
    });

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  });

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
            height={`${new_imageSize}%`}
            width={`${new_imageSize}%`}
            style={{ paddingTop: "30px", paddingLeft: "15px" }}
          />
          <dl style={{ alignItems: "center", marginRight: "20px" }}>
            <dt
              style={{
                color: primaryLabelColor,
                fontSize: `${new_fontSize}px`,
              }}
            >
              TOTAL EXCEEDED
            </dt>
            <dd
              style={{
                color: valueLabelColor,
                fontSize: `${new_valueSize}px`,
                fontWeight: "bold",
                fontFamily: "calibri",
                lineHeight: "1.2",
                margin: "auto",
              }}
            >
              {thousands_separators(totale)}
            </dd>
            <div style={{ fontSize: `${new_valueSize}*0.5px` }}>
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
