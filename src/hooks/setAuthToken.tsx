import http from "../http-common";

export const setAuthToken = (token: string) => {
  if (token) {
    http.defaults.headers.common["Authorization"] = `${token}`;
  } else delete http.defaults.headers.common["Authorization"];
};
