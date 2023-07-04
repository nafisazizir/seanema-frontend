import axios from "axios";

export default axios.create({
  baseURL: "http://seanema-backend.nafisazizi.com/api",
  headers: {
    "Content-type": "application/json"
  }
});