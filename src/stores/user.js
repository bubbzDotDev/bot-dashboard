import { defineStore } from "pinia";
import { getAuthStatus, getGuilds } from "@/utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    loading: false,
    guilds: {},
    guildsLoading: false,
    menuIsOpen: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getLoading: (state) => state.loading,
    getGuilds: (state) => state.guilds,
    getGuildsLoading: (state) => state.guildsLoading,
    getMenuIsOpen: (state) => state.menuIsOpen,
  },
  actions: {
    fetchUserStatus() {
      this.loading = true;
      getAuthStatus()
        .then(({ data }) => {
          this.user = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI.
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchGuilds() {
      this.guildsLoading = true;
      getGuilds()
        .then(({ data }) => {
          this.guilds = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI.
        })
        .finally(() => {
          this.guildsLoading = false;
        });
    },
    updateMenu(payload) {
      this.menuIsOpen = payload;
    },
  },
});
