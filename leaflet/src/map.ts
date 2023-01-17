import {
  LatLngExpression,
  Map,
  TileLayer,
  map as leafletMap,
  tileLayer,
  control,
  marker,
  geoJSON,
} from "leaflet";
import "leaflet/dist/leaflet.css";

import "./style.css";
import "tilelayer-kartverket";
import { icon } from "./icon";

import { webatlasTileLayer } from "leaflet-webatlastile";
import { fetchGeoJson } from "./fetchGeoJson";
import { Feature, FeatureCollection } from "geojson";

export const setupMap = (
  div: string,
  center: LatLngExpression,
  zoom?: number
) => {
  const map = leafletMap(div).setView(center, zoom);
  addLayerControl(map);
  marker(center, { icon }).addTo(map);

  fetchGeoJson().then((data: FeatureCollection) => addGeoJson(map, data));
};

const addGeoJson = (map: Map, featureCollection: FeatureCollection) => {
  const layer = geoJSON(featureCollection, {
    pointToLayer: (f: Feature, latLng: LatLngExpression) =>
      marker(latLng, { icon }),
  }).addTo(map);

  map.fitBounds(layer.getBounds());
};

const addLayerControl = (map: Map) => {
  const topo4 = (tileLayer as any).kartverket("topo4").addTo(map);
  const webatlasMap = webatlasTileLayer({
    apiKey: process.env.WEBATLAS_TILE_KEY,
  });

  control
    .layers({
      "Kartverket Topo 4": topo4,
      "Norkart ": webatlasMap as unknown as TileLayer,
    })
    .addTo(map);
};
