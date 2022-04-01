<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <h2>Settings</h2>
    <ul>
      <li>
        <RouterLink to="settings/prefix" class="setting-card"
          >Command Prefix</RouterLink
        >
      </li>
      <li>
        <RouterLink to="settings/welcome" class="setting-card"
          >Welcome Message</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
}

li {
  margin: 1rem;
}
.setting-card {
  background-color: $primary;
  color: $link-light;
  border: 3px solid $link-light;
  padding: 1rem;
  height: 85px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  transition: 0.25s;

  &:hover {
    animation: rock-slightly 1s;
    background-color: $primary-light;
    color: $link-dark;
    border: 3px solid $primary;
  }
}
</style>
