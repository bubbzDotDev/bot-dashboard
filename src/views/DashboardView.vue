<script setup>
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import SignIn from "@/components/auth/SignIn.vue";

const userStore = useUserStore();
const user = computed(() => userStore.getUser);
const userLoading = computed(() => userStore.getLoading);
const guildsLoading = computed(() => userStore.getGuildsLoading);
</script>

<template>
  <main>
    <div v-if="userLoading || guildsLoading">
      <h2>Loading...</h2>
    </div>
    <div v-else>
      <div v-if="!user">
        <h2>Not signed in.</h2>
        <SignIn />
      </div>
      <div v-else>
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 0 0 1rem 0;
}
</style>
