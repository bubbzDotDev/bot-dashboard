<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";

const loggedIn = ref(true);
</script>

<template>
  <main>
    <div v-if="loggedIn">
      <RouterView />
    </div>
    <div v-else>
      <h2>Not logged in.</h2>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0;
}
</style>
