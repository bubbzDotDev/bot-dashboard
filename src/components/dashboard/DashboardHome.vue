<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getGuildIconURL } from "@/utils/helpers";

const userStore = useUserStore();

const mutualGuilds = ref([]);
mutualGuilds.value = userStore.getMutualGuilds;
</script>

<template>
  <div v-if="mutualGuilds.length">
    <h2>Your Server<span v-if="mutualGuilds.length > 1">s</span></h2>
    <div class="guild-card-container">
      <div v-for="mutualGuild in mutualGuilds" :key="mutualGuild.id">
        <RouterLink :to="`/dashboard/${mutualGuild.id}`" class="guild-card">
          <p>{{ mutualGuild.name }}</p>
          <img
            v-if="mutualGuild.icon"
            :src="getGuildIconURL(mutualGuild)"
            alt="Server icon"
            height="32"
            width="32"
          />
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-else>
    <h2>
      No servers yet. Create one on
      <a rel="noopener" href="https://discord.com/" target="_blank">Discord</a>!
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;
.guild-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.guild-card {
  @include card;

  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  transition: 0.5s;

  p {
    margin: 0;
    text-align: center;
  }

  &:hover {
    animation: rock-slightly 1s;
    background-color: $primary-light;
    color: $link-dark;
    border: 3px solid $primary;
  }
}
</style>
