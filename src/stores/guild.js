import { defineStore } from "pinia";
import { getGuildConfig, updateGuildPrefix } from "@/utils/api";

export const useGuildStore = defineStore({
  id: "guild",
  state: () => ({
    guild: {},
    config: {},
    configLoading: false,
    prefixLoading: false,
  }),
  getters: {
    getGuild: (state) => state.guild,
    getConfig: (state) => state.config,
    getConfigLoading: (state) => state.configLoading,
    getPrefixLoading: (state) => state.prefixLoading,
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
  },
});
