<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const user = ref({});
const loading = ref(false);

onBeforeMount(async () => {
  await userStore.fetchUserStatus();
});

user.value = userStore.getUser;
loading.value = userStore.getLoading;

watch(
  () => userStore.getUser,
  () => {
    user.value = userStore.getUser;
  }
);

watch(
  () => userStore.getLoading,
  () => {
    loading.value = userStore.getLoading;
  }
);
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
