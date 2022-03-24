<script setup>
import { RouterLink } from "vue-router";
import SignIn from "@/components/auth/SignIn.vue";
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

    <section>
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

    <section>
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
}

section {
  margin: 3rem 0;
}
</style>
