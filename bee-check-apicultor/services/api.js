import axios from "axios";
import { uris } from "../assets";

const instance = axios.create({
  baseURL: uris.BASE_URL,
});

export default {
  instance
};