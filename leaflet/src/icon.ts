import { icon as LeafletIcon } from "leaflet";
const iconUrl = require("leaflet/dist/images/marker-icon.png");
const iconRetinaUrl = require("leaflet/dist/images/marker-icon-2x.png");

const shadowUrl = require("leaflet/dist/images/marker-shadow.png");

export const icon = LeafletIcon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
