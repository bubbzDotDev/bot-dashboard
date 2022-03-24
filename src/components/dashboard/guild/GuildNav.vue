<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/dashboard">Main</RouterLink>
      </li>
      <li>Embeds</li>
      <li>Settings</li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

nav {
  background-color: $accent;
  padding: 0.5rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
}
</style>
