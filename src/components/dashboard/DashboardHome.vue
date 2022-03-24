<script setup>
import { RouterLink } from "vue-router";

const guilds = [
  {
    id: "123",
    name: "Server 1",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
  {
    id: "124",
    name: "Server 2",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
  {
    id: "125",
    name: "Server 3",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
];
</script>

<template>
  <div>
    <div v-if="guilds.length">
      <h2>Your Server<span v-if="guilds.length > 1">s</span></h2>
      <div class="guild-card-container">
        <div v-for="guild in guilds" :key="guild.id" class="guild-card">
          <RouterLink :to="`/dashboard/${guild.id}`">
            <h3>{{ guild.name }}</h3>
            <img :src="guild.icon" alt="Server icon" height="32" width="32" />
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>
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
  margin: 1rem;
  border: 3px solid $primary;
  padding: 1rem;
  height: 85px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
  }

  h3 {
    margin: 0;
  }
}
</style>
