import axios from "axios"

axios.defaults.baseURL = "http://localhost:3045"

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.timeout = 10000;

export default axios;