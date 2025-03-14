import axios from "axios";

export const baseUrl = "https://192.168.1.7:5001/api/";

function normalizeUrl(url) {
  return url.replace("//", "/");
}

export const area = {
  Global: "global/",
  Admin: "admin/",
};

export const versions = {
  V1: "v1/",
  V2: "v2/",
};

export const apiRoutes = {
  Token: "Authentication/Token",
  ProductCategories: "ProductCategories/",
};

export const apiFetch = ({
  header = null,
  body = null,
  version,
  area,
  route,
  method,
  parameters = "",
}) => {
  return axios({
    baseURL: baseUrl,
    headers: header,
    data: body,
    method: method,
    url: normalizeUrl(version + area + route + parameters),
  });
};
