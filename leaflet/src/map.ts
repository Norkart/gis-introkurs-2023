import L, { LatLngExpression, Map, TileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
import "tilelayer-kartverket";

import { webatlasTileLayer } from "leaflet-webatlastile";

export const setupMap = (
  div: string,
  center: LatLngExpression,
  zoom?: number
) => {
  const map = L.map(div).setView(center, zoom);
  addLayerControl(map);
};

const addLayerControl = (map: Map) => {
  const topo4 = (L.tileLayer as any).kartverket("topo4").addTo(map);
  const webatlasMap = webatlasTileLayer({
    apiKey: process.env.WEBATLAS_TILE_KEY,
  });

  L.control
    .layers({
      "Kartverket Topo 4": topo4,
      "Norkart ": webatlasMap,
    })
    .addTo(map);
};
