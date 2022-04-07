import axios from "axios";

const CONFIG = { withCredentials: true };
const API_URL = `${import.meta.env.VITE_API_HOST}/api`;

export const getAuthStatus = () => axios.get(`${API_URL}/auth/status`, CONFIG);

export const getMutualGuilds = () =>
  axios.get(`${API_URL}/discord/guilds`, CONFIG);

export const getGuildConfig = (guildId) =>
  axios.get(`${API_URL}/guilds/${guildId}/config`, CONFIG);

export const updateGuildPrefix = (guildId, prefix) =>
  axios.post(
    `${API_URL}/guilds/${guildId}/config/prefix`,
    {
      prefix,
    },
    CONFIG
  );

export const getGuildChannels = (guildId) =>
  axios.get(`${API_URL}/discord/guilds/${guildId}/channels`, CONFIG);

export const updateWelcomeChannel = (
  guildId,
  welcomeChannelId,
  welcomeMessage
) =>
  axios.post(
    `${API_URL}/guilds/${guildId}/config/welcome`,
    {
      welcomeChannelId,
      welcomeMessage,
    },
    CONFIG
  );
