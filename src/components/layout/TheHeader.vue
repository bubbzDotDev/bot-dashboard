<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const user = ref({});
user.value = userStore.getUser;
watch(
  () => userStore.getUser,
  (newValue) => {
    user.value = newValue;
  },
);

const logout = async () => {
  await userStore.logUserOut();
};
</script>

<template>
  <header id="home">
    <RouterLink to="/">
      <img
        src="@/assets/images/logo.svg"
        alt="Announcement Bot logo"
        width="100"
        height="100"
      />
    </RouterLink>

    <h1>Announcement Bot</h1>

    <button
      v-if="
        user &&
        Object.keys(user).length > 0 &&
        Object.getPrototypeOf(user) === Object.prototype
      "
      @click="logout"
      type="button"
    >
      LOGOUT
    </button>
  </header>
</template>

<style lang="scss">
@use "@/assets/scss/main.scss" as *;

header {
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: $primary-light;
  z-index: 1;
  position: relative;

  button {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0;

    @include breakpoint("medium") {
      padding: 1rem;
    }

    &:hover {
      background-color: unset;
      text-decoration: underline;
    }
  }
}
</style>
