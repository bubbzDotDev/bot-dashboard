<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
</script>

<template>
  <div class="app-grid">
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
</style>
