import axios from "axios";

export const agentApi = axios.create({
    baseURL: "https://randomuser.me/api/",
    timeout: 5000,
});
