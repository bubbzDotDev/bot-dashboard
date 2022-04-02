<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getGuildIconURL } from "@/utils/helpers";

const userStore = useUserStore();

const guilds = ref([]);

onBeforeMount(async () => {
  await userStore.fetchMutualGuilds();
});

guilds.value = userStore.getMutualGuilds;

watch(
  () => userStore.getMutualGuilds,
  () => {
    guilds.value = userStore.getMutualGuilds;
  }
);

const loading = ref(false);
loading.value = userStore.getGuildsLoading;
watch(
  () => userStore.getGuildsLoading,
  () => {
    loading.value = userStore.getGuildsLoading;
  }
);
</script>

<template>
  <div>
    <div v-if="guilds.length">
      <h2>Your Server<span v-if="guilds.length > 1">s</span></h2>
      <div class="guild-card-container">
        <div v-for="guild in guilds" :key="guild.id">
          <RouterLink :to="`/dashboard/${guild.id}`" class="guild-card">
            <p>{{ guild.name }}</p>
            <img
              v-if="guild.icon"
              :src="getGuildIconURL(guild)"
              alt="Server icon"
              height="32"
              width="32"
            />
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 v-if="loading">Loading...</h2>
      <h2 v-else>
        No servers yet. Create one on
        <a rel="noopener" href="https://discord.com/" target="_blank">Discord</a
        >!
      </h2>
    </div>
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
