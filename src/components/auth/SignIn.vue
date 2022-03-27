<script setup>
const redirect = () => {
  window.location.href = "http://localhost:3001/api/auth/login"; // Update for production
};
</script>

<template>
  <div class="sign-in-container">
    <span>SIGN IN WITH DISCORD</span>
    <button @click="redirect" type="button">SIGN IN</button>
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
