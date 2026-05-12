import type { TypeFieldType } from "./uniqueValues";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";
import Query from "@arcgis/core/rest/support/Query";

//-------------------------------------//
//        Chart Data generation        //
//-------------------------------------//
interface queryBuildingLayersType {
  qChart: any;
  chartCategoryTypes?: any;
  chartCategory?: any;
  chartCategoryField?: any;
  chartCategoryValueType?: TypeFieldType;
  layers:
    | [FeatureLayer, FeatureLayer?, FeatureLayer?, FeatureLayer?, FeatureLayer?]
    | any;
  status?: number;
  statusState?: any;
  statusField?: any;
  qExpression?: any;
}

export async function chartDataQuery({
  qChart: qChart,
  layers: layers,
  statusState: statusState,
  statusField: statusField,
}: queryBuildingLayersType) {
  //--- types: include 'others'. Each main type may have others (types = 0)
  const compile: any = [];

  //--- Main statistics
  statusState.map((status: any) => {
    const temp = new StatisticDefinition({
      onStatisticField: `CASE WHEN ${statusField} = ${status} THEN 1 ELSE 0 END`,
      outStatisticFieldName: `stats${status}`,
      statisticType: "sum",
    });
    compile.push(temp);
  });

  //--- Query
  const query = new Query();
  query.outStatistics = compile;
  query.where = qChart;

  //--- Query features using statistics definitions
  const qStats = layers?.queryFeatures(query).then((response: any) => {
    const stats = response.features[0].attributes;
    const nodata = stats[compile[0].outStatisticFieldName];
    const normal = stats[compile[1].outStatisticFieldName];
    const exceeded = stats[compile[2].outStatisticFieldName];
    const total = nodata + normal + exceeded;

    // return [incomp, comp, ongoing, delayed, total];
    return [nodata, normal, exceeded, total];
  });
  return qStats;
}

export async function chartDataStackColumns({
  qChart: qChart,
  layers: layers,
  chartCategoryTypes: chartCategoryTypes,
  chartCategoryField: chartCategoryField,
  chartCategoryValueType: chartCategoryValueType,
  statusState: statusState,
  statusField: statusField,
  qExpression: qExpression,
}: queryBuildingLayersType) {
  if (chartCategoryField) {
    // 1. Map through types and return a promise for each type
    const promises = chartCategoryTypes.map(async (type: any) => {
      let total_exceeded = 0;
      let total_normal = 0;
      let total_nodata = 0;

      // 2. Use Promise.all to wait for all statuses
      await Promise.all(
        statusState.map(async (status: any) => {
          const onStatisticField =
            chartCategoryValueType === "number"
              ? `CASE WHEN (${chartCategoryField} = ${type.value} AND ${statusField} = ${status}) THEN 1 ELSE 0 END`
              : `CASE WHEN (${chartCategoryField} = '${type.value}' AND ${statusField} = ${status}) THEN 1 ELSE 0 END`;

          const temp = new StatisticDefinition({
            onStatisticField: onStatisticField,
            outStatisticFieldName: "temp",
            statisticType: "sum",
          });

          const query = new Query();
          query.outStatistics = [temp];
          query.where = qChart;

          // 3. Await layer queries
          for (const layer of layers) {
            const response = await layer.queryFeatures(query);
            const stats = response.features[0]?.attributes;
            if (stats) {
              if (status === 1) total_nodata += stats["temp"] || 0;
              if (status === 2) total_normal += stats["temp"] || 0;
              if (status === 3) total_exceeded += stats["temp"] || 0;
            }
          }
        }),
      );

      // Return the compiled result for this type
      return {
        category: type.category,
        exceeded: total_exceeded,
        normal: total_normal,
        nodata: total_nodata,
        icon: type.icon,
      };
    });

    // 4. Wait for all type calculations to finish
    const results = await Promise.all(promises);
    const total_exceeded = results.reduce(
      (sum: any, item: any) => sum + item.exceeded,
      0,
    );
    const total_all = results.reduce(
      (sum: any, item: any) => sum + item.exceeded + item.normal + item.nodata, // + item.ongoing + item.delayed,
      0,
    );
    return [results, total_all, total_exceeded];
    //--------------------------//
    //    only status field     //
    //--------------------------//
  } else {
    let total_exceeded = 0;
    let total_all = 0;

    const data0 = chartCategoryTypes.map(async (type: any, index: any) => {
      //--- Calculate statistics
      const stats = await chartDataQuery({
        qChart: qChart,
        layers: layers[index],
        statusState: statusState,
        statusField: statusField,
        qExpression: qExpression,
      });

      //--- Compute total numbers for completed and grand total
      total_exceeded += stats[1];
      total_all += stats[4];

      return Object.assign({
        category: type.category,
        exceeded: stats[1],
        normal: stats[0],
      });
    });

    //--- Resolve Promise all
    const data = await Promise.all(data0);
    return [data, total_all, total_exceeded];
  }
}
