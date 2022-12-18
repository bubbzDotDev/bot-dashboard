<script setup>
import { reactive, watch, onBeforeMount } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { getGuildIconURL } from "@/utils/helpers";

const userStore = useUserStore();

let guilds = reactive({});
guilds = userStore.getGuilds;
watch(
  () => userStore.getGuilds,
  (newValue) => {
    guilds = newValue;
  }
);

const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const permissions = import.meta.env.VITE_DISCORD_PERMISSIONS;

const redirect = () => {
  setTimeout(() => {
    window.location.href = `${import.meta.env.VITE_FRONTEND_HOST}`;
  }, 5000);
};

if (
  guilds &&
  Object.keys(guilds).length === 0 &&
  Object.getPrototypeOf(guilds) === Object.prototype
) {
  onBeforeMount(async () => {
    try {
      await userStore.fetchGuilds();
    } catch (error) {
      console.log(error);
    }
  });
}
</script>

<template>
  <div v-if="
    guilds &&
    (guilds.mutualGuilds || guilds.availableGuilds) &&
    (Object.keys(guilds.mutualGuilds).length > 0 || Object.keys(guilds.availableGuilds).length > 0)
  ">
    <div v-if="guilds.mutualGuilds && guilds.mutualGuilds.length">
      <h2>Manage Bot</h2>
      <div class="guild-card-container">
        <div v-for="mutualGuild in guilds.mutualGuilds" :key="mutualGuild.id">
          <RouterLink :to="`/dashboard/${mutualGuild.id}`" class="guild-card">
            <p>{{ mutualGuild.name }}</p>
            <div v-if="mutualGuild.icon" class="guild-image-container">
              <img
                :src="getGuildIconURL(mutualGuild)"
                alt="Server icon"
                height="32"
                width="32"
              />
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="guilds.availableGuilds && guilds.availableGuilds.length">
      <h2>Add Bot</h2>
      <div class="guild-card-container">
        <div
          v-for="availableGuild in guilds.availableGuilds"
          :key="availableGuild.id"
        >
          <a
            @click="redirect"
            class="guild-card"
            :href="`https://discord.com/api/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissions}&guild_id=${availableGuild.id}&disable_guild_select=true`"
            target="_blank"
          >
            <p>{{ availableGuild.name }}</p>
            <div v-if="availableGuild.icon" class="guild-image-container">
              <img
                :src="getGuildIconURL(availableGuild)"
                alt="Server icon"
                height="32"
                width="32"
              />
            </div>
          </a>
        </div>
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

.guild-image-container {
  border: 3px solid $link-light;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
  }
}
</style>
