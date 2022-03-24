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
  border: 3px solid $primary;
  padding: 1rem;
  height: 85px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
