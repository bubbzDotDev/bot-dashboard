import axios from "axios";

const CONFIG = { withCredentials: true };
const API_URL = `${import.meta.env.VITE_API_HOST}/api`;

export const getAuthStatus = () => axios.get(`${API_URL}/auth/status`, CONFIG);

export const getMutualGuilds = () =>
  axios.get(`${API_URL}/discord/guilds`, CONFIG);

export const getGuildConfig = (guildId) =>
  axios.get(`${API_URL}/guilds/config/${guildId}`, CONFIG);

export const updateGuildPrefix = (guildId, prefix) =>
  axios.post(
    `${API_URL}/guilds/${guildId}/config/prefix`,
    {
      prefix,
    },
    CONFIG
  );
