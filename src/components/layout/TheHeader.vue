<script setup>
import { RouterLink } from "vue-router";
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

  h1 {
    font-size: 1.5rem;
  }
}
</style>
