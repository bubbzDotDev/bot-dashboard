<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
userStore.fetchUserStatus();

const loading = ref(false);
loading.value = userStore.getLoading;

const user = ref(null);
user.value = userStore.getUser;

console.log("user:", user.value);
console.log("loading:", loading.value);
</script>

<template>
  <main>
    <div v-if="loading">
      <h2>Loading...</h2>
    </div>
    <div v-else>
      <div v-if="user">
        <RouterView />
      </div>
      <div v-else>
        <h2>Not logged in.</h2>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0;
}
</style>
