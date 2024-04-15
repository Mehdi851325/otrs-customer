import axios from "axios";

export default axios.create({
  baseURL: "https://support-api.si24.ir:15000",
  headers: {
    "Content-Type": "application/json",
  },
});
