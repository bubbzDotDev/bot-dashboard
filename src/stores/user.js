import { defineStore } from "pinia";
import { getAuthStatus, getMutualGuilds } from "@/utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    loading: false,
    mutualGuilds: [],
    guildsLoading: false,
    menuIsOpen: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getLoading: (state) => state.loading,
    getMutualGuilds: (state) => state.mutualGuilds,
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
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fetchMutualGuilds() {
      this.guildsLoading = true;
      getMutualGuilds()
        .then(({ data }) => {
          this.mutualGuilds = data;
        })
        .catch((err) => {
          console.log(err);
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
