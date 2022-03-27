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
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});
