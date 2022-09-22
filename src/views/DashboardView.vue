<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import SignIn from "@/components/auth/SignIn.vue";

const userStore = useUserStore();

const user = ref({});
user.value = userStore.getUser;
watch(
  () => userStore.getUser,
  (newValue) => {
    user.value = newValue;
  }
);

const userLoading = ref(false);
userLoading.value = userStore.getLoading;
watch(
  () => userStore.getLoading,
  (newValue) => {
    userLoading.value = newValue;
  }
);

if (
  user.value &&
  Object.keys(user.value).length === 0 &&
  Object.getPrototypeOf(user.value) === Object.prototype
) {
  onBeforeMount(async () => {
    await userStore.fetchUserStatus();
  });
}

const guilds = ref({});
guilds.value = userStore.getGuilds;
watch(
  () => userStore.getGuilds,
  (newValue) => {
    guilds.value = newValue;
  }
);

const guildsLoading = ref(false);
guildsLoading.value = userStore.getGuildsLoading;
watch(
  () => userStore.getGuildsLoading,
  (newValue) => {
    guildsLoading.value = newValue;
  }
);
</script>

<template>
  <main>
    <div v-if="userLoading || guildsLoading">
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
  padding: 0 0 1rem 0;
}
</style>
