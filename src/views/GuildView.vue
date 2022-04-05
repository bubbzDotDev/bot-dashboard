<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGuildStore } from "@/stores/guild";
import GuildNav from "@/components/dashboard/guild/GuildNav.vue";

const userStore = useUserStore();
const guildStore = useGuildStore();

const route = useRoute();

const mutualGuildId = ref(null);
const currentGuild = ref({});

const loading = ref(false);
loading.value = userStore.getGuildsLoading;
watch(
  () => userStore.getGuildsLoading,
  () => {
    loading.value = userStore.getGuildsLoading;
  }
);

const mutualGuilds = ref([]);
mutualGuilds.value = userStore.getMutualGuilds;
watch(
  () => userStore.getMutualGuilds,
  () => {
    mutualGuilds.value = userStore.getMutualGuilds;
  }
);

if (!mutualGuilds.value.length) {
  onBeforeMount(async () => {
    await userStore.fetchMutualGuilds();
  });
}

mutualGuildId.value = route.params.id;

const matchingMutualGuild = mutualGuilds.value.filter((mutualGuild) => {
  return mutualGuild.id === mutualGuildId.value;
});

currentGuild.value = matchingMutualGuild[0];
guildStore.setGuild(currentGuild.value);
</script>

<template>
  <div v-if="loading">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <div
      v-if="
        currentGuild &&
        Object.keys(currentGuild).length === 0 &&
        Object.getPrototypeOf(currentGuild) === Object.prototype
      "
      class="center"
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
  </div>
</template>

<style lang="scss" scoped>
.guild-grid {
  display: grid;
  grid-template-rows: auto 1fr;
}

.center {
  text-align: center;
}
</style>
