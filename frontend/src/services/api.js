import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-e8lr.onrender.com/api/",
});

export default API;
