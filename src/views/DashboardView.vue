<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import SignIn from "@/components/auth/SignIn.vue";

const userStore = useUserStore();

const user = ref({});
const loading = ref(false);

user.value = userStore.getUser;
loading.value = userStore.getLoading;

if (
  user.value &&
  Object.keys(user.value).length === 0 &&
  Object.getPrototypeOf(user.value) === Object.prototype
) {
  onBeforeMount(async () => {
    await userStore.fetchUserStatus();
  });
}

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
      <div
        v-if="
          user &&
          Object.keys(user).length === 0 &&
          Object.getPrototypeOf(user) === Object.prototype
        "
      >
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
  padding: 0;
}
</style>
