import { defineStore } from "pinia";
import { getAuthStatus, getAuthLogout, getGuilds } from "@/utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    loading: false,
    guilds: null,
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
        .then((data) => {
          this.user = data;
        })
        .catch((err) => {
          console.log(err); // Remove for production; add error handling in UI.
        })
        .finally(() => {
          this.loading = false;
        });
    },
    logUserOut() {
      this.loading = true;
      getAuthLogout()
        .then(() => {
          this.user = null;
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
        .then((data) => {
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
