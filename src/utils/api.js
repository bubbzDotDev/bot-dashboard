import axios from "axios";

const CONFIG = { withCredentials: true };

export const getAuthStatus = () => {
  return axios.get("http://localhost:3001/api/auth/status", CONFIG);
};

export const getMutualGuilds = () => {
  return axios.get("http://localhost:3001/api/discord/guilds", CONFIG);
};
