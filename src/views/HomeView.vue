<script setup>
import SignIn from "@/components/auth/SignIn.vue";
import ToDashboard from "@/components/auth/ToDashboard.vue";
import { ref, onBeforeMount, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const user = ref({});
onBeforeMount(async () => {
  await userStore.fetchUserStatus();
});
user.value = userStore.getUser;
watch(
  () => userStore.getUser,
  () => {
    user.value = userStore.getUser;
  }
);
</script>

<template>
  <main>
    <h2>Welcome!</h2>
    <p>
      Announcement Bot (built for
      <a rel="noopener" href="https://discord.com/" target="_blank">Discord</a>
      servers) makes it easy to post <em>embeds</em> for any message you may
      want to create.
    </p>
    <RouterLink to="/#learn">
      <button>LEARN MORE</button>
    </RouterLink>

    <section v-if="user">
      <h2>WELCOME BACK!</h2>
      <ToDashboard
        :username="user.username"
        :discriminator="user.discriminator"
      />
    </section>
    <section v-else>
      <h2>GET STARTED NOW!</h2>
      <SignIn />
    </section>

    <section>
      <h2>Placeholder for gif #1</h2>
      <div class="gif-container"></div>
    </section>

    <section>
      <h2>Placeholder for gif #2</h2>
      <div class="gif-container"></div>
    </section>

    <section id="learn">
      <h2>About</h2>
      <p>Create a custom embedded message with an updating preview of it.</p>
    </section>

    <section v-if="user">
      <h2>GLAD TO HAVE YOU BACK!</h2>
      <ToDashboard
        :username="user.username"
        :discriminator="user.discriminator"
      />
    </section>
    <section v-else>
      <h2>TRY IT TODAY!</h2>
      <SignIn />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gif-container {
  border: 3px solid black;
  height: 200px;
  width: 200px;
}

section {
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
