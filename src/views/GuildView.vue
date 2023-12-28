<script setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGuildStore } from "@/stores/guild";
import GuildNav from "@/components/dashboard/guild/GuildNav.vue";

const userStore = useUserStore();
const guildStore = useGuildStore();

const route = useRoute();

const guildConfig = computed(() => guildStore.getConfig);
const channelsLoading = computed(() => guildStore.getChannelsLoading);
const configLoading = computed(() => guildStore.getConfigLoading);

const guildsLoading = computed(() => userStore.getGuildsLoading);
const guilds = computed(() => userStore.getGuilds);

const mutualGuildId = ref("");
mutualGuildId.value = route.params.id;

const matchingMutualGuild = guilds.value.mutualGuilds.filter(
  (mutualGuild) => mutualGuild.id === mutualGuildId.value,
);

const currentGuild = ref({});
[currentGuild.value] = matchingMutualGuild;
guildStore.setGuild(currentGuild.value);

if (!guildConfig.value || currentGuild.value.id !== guildConfig.value.guildId) {
  guildStore.fetchGuildConfig();
}

const channels = computed(() => guildStore.getChannels);

if (
  !channels.value.length ||
  currentGuild.value.id !== guildConfig.value.guildId
) {
  guildStore.fetchGuildChannels();
}
</script>

<template>
  <div v-if="guildsLoading || configLoading || channelsLoading">
    <h2>Loading...</h2>
  </div>
  <div v-else>
    <div v-if="!currentGuild" class="center">
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
