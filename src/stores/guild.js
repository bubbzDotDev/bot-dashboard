import { defineStore } from "pinia";

export const useGuildStore = defineStore({
  id: "guild",
  state: () => ({
    guild: {},
  }),
  getters: {
    getGuild: (state) => state.guild,
  },
  actions: {
    setGuild(payload) {
      this.guild = payload;
    },
  },
});
