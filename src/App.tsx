import { useState, useEffect } from "react";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import Chart from "./components/Chart";
import { MyContext } from "./contexts/MyContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authenticate } from "./autho";

//--- Create a client
const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "4uy6bDANkQ3MsHXQ");
  }, []);

  const [chartPanelwidth, setChartPanelwidth] = useState<any>();
  const updateChartPanelwidth = (newWidth: any) => {
    setChartPanelwidth(newWidth);
  };

  return (
    <>
      {loggedInState === true && (
        <div>
          <calcite-shell
            style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #555" }}
          >
            <MyContext value={{ chartPanelwidth, updateChartPanelwidth }}>
              <QueryClientProvider client={queryClient}>
                <ActionPanel />
                <MapDisplay />
                <Chart />
                <Header />
              </QueryClientProvider>
            </MyContext>
          </calcite-shell>
        </div>
      )}
    </>
  );
}

export default App;
