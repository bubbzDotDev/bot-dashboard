<script setup>
import { ref, watch } from "vue";
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGuildStore } from "@/stores/guild";
import GuildNav from "@/components/dashboard/guild/GuildNav.vue";

const userStore = useUserStore();

const guilds = ref([]);
guilds.value = userStore.getMutualGuilds;
watch(
  () => userStore.getMutualGuilds,
  () => {
    guilds.value = userStore.getMutualGuilds;
  }
);

const guildId = ref(null);
const route = useRoute();
guildId.value = route.params.id;

const matchingGuild = guilds.value.filter((guild) => {
  return guild.id === guildId.value;
});

const router = useRouter();

const currentGuild = ref({});

if (!matchingGuild.length) {
  router.push({ name: "not-found" });
} else {
  currentGuild.value = matchingGuild[0];

  const guildStore = useGuildStore();
  guildStore.setGuild(currentGuild.value);
}
</script>

<template>
  <div
    v-if="
      currentGuild &&
      Object.keys(currentGuild).length === 0 &&
      Object.getPrototypeOf(currentGuild) === Object.prototype
    "
  >
    <h2>Could not find server.</h2>
    <RouterLink to="/dashboard">
      <button type="button">DASHBOARD</button>
    </RouterLink>
  </div>
  <div v-else class="guild-grid">
    <GuildNav />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.guild-grid {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
