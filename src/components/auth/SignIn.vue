<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="sign-in-container">
    <span>SIGN IN WITH DISCORD</span>
    <RouterLink to="/dashboard">
      <button>SIGN IN</button>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;
.sign-in-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 3px solid $primary;
  padding: 1rem;
  height: 85px;
}
</style>
