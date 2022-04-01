<script setup>
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

const userStore = useUserStore();
const menuIsOpen = ref(false);
menuIsOpen.value = userStore.getMenuIsOpen;

watch(
  () => userStore.getMenuIsOpen,
  () => {
    menuIsOpen.value = userStore.getMenuIsOpen;
  }
);
</script>

<template>
  <div class="app-grid" :class="{ 'no-scroll': menuIsOpen }">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/main.scss" as *;

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "MyWebFont", sans-serif;
}

a {
  color: $link-dark;

  &:hover {
    text-decoration: none;
  }
}

main {
  background-color: $primary-light;
  padding: 1rem;
}

h2 {
  text-align: center;
}

button {
  @include button;
}

.app-grid {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.no-scroll {
  overflow: hidden;
}
</style>
