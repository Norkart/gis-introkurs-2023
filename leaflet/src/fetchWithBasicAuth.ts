export const fetchWithBasicAuth = (
  url: string,
  user: string,
  password: string,
  otherHeaders: Record<string, string> = {}
) => {
  let headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(`${user}:${password}`).toString("base64")
  );
  Object.keys(otherHeaders).forEach((k) => headers.set(k, otherHeaders[k]));

  return fetch(url, {
    method: "GET",
    headers,
  });
};
