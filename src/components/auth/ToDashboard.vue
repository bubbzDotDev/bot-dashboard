<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="to-dashboard-container">
    <span>Hi there!</span>
    <RouterLink to="/dashboard">
      <button type="button">DASHBOARD</button>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;
.to-dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 3px solid $primary;
  padding: 1rem;
  height: 85px;
  width: fit-content;
}
</style>
