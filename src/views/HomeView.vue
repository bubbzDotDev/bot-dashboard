<script setup>
import SignIn from "@/components/auth/SignIn.vue";
import ToDashboard from "@/components/auth/ToDashboard.vue";
import { onBeforeMount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const user = ref({});

user.value = userStore.getUser;

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

    <section
      v-if="
        user &&
        Object.keys(user).length === 0 &&
        Object.getPrototypeOf(user) === Object.prototype
      "
    >
      <h2>GET STARTED NOW!</h2>
      <SignIn />
    </section>
    <section v-else>
      <h2>WELCOME BACK!</h2>
      <ToDashboard
        :username="user.username"
        :discriminator="user.discriminator"
      />
    </section>

    <section>
      <h2>Quickly Change Prefix</h2>
      <div class="gif-container">
        <img
          src="@/assets/images/update-prefix-424x262.webp"
          alt="Demonstrating update prefix feature"
        />
      </div>
    </section>

    <section>
      <h2>Update Welcome Channel & Message</h2>
      <div class="gif-container">
        <img
          src="@/assets/images/update-welcome-640x480.webp"
          alt="Demonstrating update welcome channel and message feature"
        />
      </div>
    </section>

    <section id="learn">
      <h2>About</h2>
      <p>Create a custom embedded message with an updating preview of it.</p>
    </section>

    <section
      v-if="
        user &&
        Object.keys(user).length === 0 &&
        Object.getPrototypeOf(user) === Object.prototype
      "
    >
      <h2>TRY IT TODAY!</h2>
      <SignIn />
    </section>
    <section v-else>
      <h2>GLAD TO HAVE YOU BACK!</h2>
      <ToDashboard
        :username="user.username"
        :discriminator="user.discriminator"
      />
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

  img {
    width: 100%;
    height: auto;
  }
}

section {
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
