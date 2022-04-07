import { defineStore } from "pinia";
import {
  getGuildChannels,
  getGuildConfig,
  updateGuildPrefix,
  updateWelcomeChannel,
} from "@/utils/api";

export const useGuildStore = defineStore({
  id: "guild",
  state: () => ({
    guild: {},
    config: {},
    channels: [],
    configLoading: false,
    prefixLoading: false,
    channelsLoading: false,
    welcomeLoading: false,
  }),
  getters: {
    getGuild: (state) => state.guild,
    getConfig: (state) => state.config,
    getChannels: (state) => state.channels,
    getConfigLoading: (state) => state.configLoading,
    getPrefixLoading: (state) => state.prefixLoading,
    getChannelsLoading: (state) => state.channelsLoading,
    getWelcomeLoading: (state) => state.welcomeLoading,
  },
  actions: {
    setGuild(payload) {
      this.guild = payload;
    },
    fetchGuildConfig() {
      this.configLoading = true;
      getGuildConfig(this.guild.id)
        .then(({ data }) => {
          this.config = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI
        })
        .finally(() => {
          this.configLoading = false;
        });
    },
    setGuildPrefix(prefix) {
      this.prefixLoading = true;
      updateGuildPrefix(this.guild.id, prefix)
        .then(({ data }) => {
          this.config = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI
        })
        .finally(() => {
          this.prefixLoading = false;
        });
    },
    fetchGuildChannels() {
      this.channelsLoading = true;
      getGuildChannels(this.guild.id)
        .then(({ data }) => {
          this.channels = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI
        })
        .finally(() => {
          this.channelsLoading = false;
        });
    },
    setWelcome(welcomeChannelId, welcomeMessage) {
      this.welcomeLoading = true;
      updateWelcomeChannel(this.guild.id, welcomeChannelId, welcomeMessage)
        .then(({ data }) => {
          this.config = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI
        })
        .finally(() => {
          this.welcomeLoading = false;
        });
    },
  },
});
