# Leaflet-getting-started-demo

Demo showing simple leaflet-usage. 

Shows adding Kartverket and Norkart basemaps

The variable WEBATLAS_TILE_KEY in .env is generated from developer.norkart.no

# Getting started
1. npm install
2. npx parcel src/index.html
3. navigate to localhost:1234


# Tips: 
- Parcel breaks the leaflet icons paths, use 
```
import { icon } from "./icon";
marker(center, { icon }).addTo(map);
```
- fetchGeoJson.ts contains some hacks to be able to fetch static files from parcel
- fetchWithBasicAuth.ts is a simple util over fetch which adds basic auth