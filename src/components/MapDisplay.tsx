import "../index.css";
import "@arcgis/map-components/dist/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import {
  alignmentGroupLayer,
  monitorPointLayer,
  stationLayer,
} from "../layers";
import { useState } from "react";

function MapDisplay() {
  const arcgisScene = document.querySelector("arcgis-scene");
  const [_mapView, setMapView] = useState<any>(null);

  arcgisScene?.viewOnReady(() => {
    arcgisScene?.map?.add(alignmentGroupLayer);
    arcgisScene?.map?.add(stationLayer);
    arcgisScene?.map?.add(monitorPointLayer);
    arcgisScene.hideAttribution = true;
  });

  return (
    <arcgis-scene
      basemap="dark-gray-vector"
      ground="world-elevation"
      viewingMode="local"
      zoom={12}
      center="121.005, 14.56"
      onarcgisViewReadyChange={(event: any) => {
        setMapView(event.target.id);
      }}
    ></arcgis-scene>
  );
}

export default MapDisplay;
