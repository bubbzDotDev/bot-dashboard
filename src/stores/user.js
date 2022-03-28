import { defineStore } from "pinia";
import { getAuthStatus } from "@/utils/api";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    loading: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getLoading: (state) => state.loading,
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
  },
});
