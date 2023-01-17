import {
  LatLngExpression,
  Map,
  TileLayer,
  map as leafletMap,
  tileLayer,
  control,
  marker,
  geoJSON,
  Layer,
} from "leaflet";
import "leaflet/dist/leaflet.css";

import "./style.css";
import "tilelayer-kartverket";
import { icon } from "./icon";

import { webatlasTileLayer } from "leaflet-webatlastile";
import { fetchGeoJson } from "./fetchGeoJson";
import { Feature, FeatureCollection } from "geojson";
import { fetchFromNgisOpenApi } from "./fetchFromNgisOpenApi";

export const setupMap = (
  div: string,
  center: LatLngExpression,
  zoom?: number
) => {
  const map = leafletMap(div).setView(center, zoom);
  addLayerControl(map);

  fetchFromNgisOpenApi(map.getBounds().toBBoxString()).then(
    (data: FeatureCollection) => addGeoJson(map, data)
  );
};

const getColor = (type: string) => {
  const colors: Record<string, string> = {
    "112": "#ff0000",
    "111": "#00ff00",
    "122": "#0000ff",
    "181": "#ff00ff",
  };

  return colors[type] ? colors[type] : "#00ffff";
};

const getPopupContent = (layer: Layer) =>
  // @ts-ignore
  `<pre>${JSON.stringify(layer.feature.properties, null, 2)}</pre>`;

const getStyle = (feature: Feature) => ({
  fillOpacity: 0.5,
  fillColor: getColor(feature.properties.bygningstype),
  weight: 1,
  color: "#000",
});

const addGeoJson = (map: Map, featureCollection: FeatureCollection) => {
  const layer = geoJSON(featureCollection, {
    style: getStyle,
  })
    .bindPopup(getPopupContent)
    .addTo(map);

  map.fitBounds(layer.getBounds());
};

const addLayerControl = (map: Map) => {
  const topo4 = (tileLayer as any).kartverket("topo4");
  const webatlasMap = (
    webatlasTileLayer({
      apiKey: process.env.WEBATLAS_TILE_KEY,
    }) as unknown as Layer
  ).addTo(map);

  control
    .layers({
      "Kartverket Topo 4": topo4,
      "Norkart ": webatlasMap as unknown as TileLayer,
    })
    .addTo(map);
};
