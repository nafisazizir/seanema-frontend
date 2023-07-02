import http from "../http-common";

export function logout() {
  localStorage.removeItem("token");
  delete http.defaults.headers.common["Authorization"];
}
