const apiUrl = `${import.meta.env.VITE_API_HOST}/api`;
const getOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

export async function getAuthStatus() {
  const response = await fetch(`${apiUrl}/auth/status`, getOptions);
  return response.json();
}

export async function getAuthLogout() {
  const response = await fetch(`${apiUrl}/auth/logout`, getOptions);
  return response.json();
}

export async function getGuilds() {
  const response = await fetch(`${apiUrl}/discord/guilds`, getOptions);
  return response.json();
}

export async function getGuildConfig(guildId) {
  const response = await fetch(
    `${apiUrl}/guilds/${guildId}/config`,
    getOptions,
  );
  return response.json();
}

export async function getGuildChannels(guildId) {
  const response = await fetch(
    `${apiUrl}/discord/guilds/${guildId}/channels`,
    getOptions,
  );
  return response.json();
}

export async function updateGuildPrefix(guildId, prefix) {
  const response = await fetch(`${apiUrl}/guilds/${guildId}/config/prefix`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      prefix,
    }),
  });
  return response.json();
}

export async function updateWelcomeChannel(
  guildId,
  welcomeChannelId,
  welcomeMessage,
) {
  const response = await fetch(`${apiUrl}/guilds/${guildId}/config/welcome`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      welcomeChannelId,
      welcomeMessage,
    }),
  });
  return response.json();
}

export async function sendAnnouncement(payload) {
  const response = await fetch(`${apiUrl}/guilds/${payload.guildId}/announce`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ payload }),
  });
  return response.json();
}
