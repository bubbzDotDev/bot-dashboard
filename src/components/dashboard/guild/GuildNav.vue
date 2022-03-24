<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const guildId = ref(null);
const route = useRoute();
guildId.value = route.params.id;
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/dashboard">Server List</RouterLink>
      </li>
      <li>
        <RouterLink :to="`/dashboard/${guildId}`">Main</RouterLink>
      </li>
      <li>Embeds</li>
      <li>
        <RouterLink :to="`/dashboard/${guildId}/settings`">Settings</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

nav {
  background-color: $accent;
  padding: 0.5rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
}
</style>
