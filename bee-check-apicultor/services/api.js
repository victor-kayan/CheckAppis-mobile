import axios from "axios";
import { URLS } from "../assets";

const instance = axios.create({
  baseURL: URLS.BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  instance
};
