import axios from "axios";

const CONFIG = { withCredentials: true };

export const getAuthStatus = () => {
  return axios.get("http://localhost:3001/api/auth/status", CONFIG); // Change for production; use env variables for host
};

export const getMutualGuilds = () => {
  return axios.get("http://localhost:3001/api/discord/guilds", CONFIG); // Change for production; use env variables for host
};
