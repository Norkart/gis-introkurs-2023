import { fetchWithBasicAuth } from "./fetchWithBasicAuth";

const user = process.env.NGIS_OPEN_API_USER;
const pass = process.env.NGIS_OPEN_API_PASS;

export const fetchFromNgisOpenApi = (bounds: string) => {
  const url = `https://openapi-test.kartverket.no/v1/datasets/63cb2b40-1461-4a9a-90c1-446ef0ee42f4/features?bbox=${bounds}&crs_EPSG=4326&normalized_for_visualization=true`;
  fetchWithBasicAuth(url, user, pass, {
    "X-Client-Product-Version": "KartAITest",
    Accept: "application/vnd.kartverket.sosi+json; version=1.0",
  })
    .then((r) => r.json())
    .then((d) => console.log(d));
};
