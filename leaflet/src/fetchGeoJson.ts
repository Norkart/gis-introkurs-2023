// @ts-ignore
import file from "url:../data.json";

export const fetchGeoJson = () => fetch(file).then((d) => d.json());
