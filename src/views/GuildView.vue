<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useGuildStore } from "@/stores/guild";
import GuildNav from "@/components/dashboard/guild/GuildNav.vue";

const userStore = useUserStore();
const guildStore = useGuildStore();

const route = useRoute();

const guildConfig = ref({});
guildConfig.value = guildStore.getConfig;
watch(
  () => guildStore.getConfig,
  (newValue) => {
    guildConfig.value = newValue;
  }
);

const channelsLoading = ref(false);
channelsLoading.value = guildStore.getChannelsLoading;
watch(
  () => guildStore.getChannelsLoading,
  (newValue) => {
    channelsLoading.value = newValue;
  }
);

const configLoading = ref(false);
configLoading.value = guildStore.getConfigLoading;
watch(
  () => guildStore.getConfigLoading,
  (newValue) => {
    configLoading.value = newValue;
  }
);

const guildsLoading = ref(false);
guildsLoading.value = userStore.getGuildsLoading;
watch(
  () => userStore.getGuildsLoading,
  (newValue) => {
    guildsLoading.value = newValue;
  }
);

const guilds = ref({});
guilds.value = userStore.getGuilds;

watch(
  () => userStore.getGuilds,
  (newValue) => {
    guilds.value = newValue;
  }
);

const mutualGuildId = ref("");
mutualGuildId.value = route.params.id;

const matchingMutualGuild = guilds.value.mutualGuilds.filter(
  (mutualGuild) => mutualGuild.id === mutualGuildId.value
);

const currentGuild = ref({});
[currentGuild.value] = matchingMutualGuild;
guildStore.setGuild(currentGuild.value);

if (
  (guildConfig.value &&
    Object.keys(guildConfig.value).length === 0 &&
    Object.getPrototypeOf(guildConfig.value) === Object.prototype) ||
  currentGuild.value.id !== guildConfig.value.guildId
) {
  onBeforeMount(async () => {
    await guildStore.fetchGuildConfig();
  });
}

const channels = ref([]);
channels.value = guildStore.getChannels;
watch(
  () => guildStore.getChannels,
  (newValue) => {
    channels.value = newValue;
  }
);

if (
  !channels.value.length ||
  currentGuild.value.id !== guildConfig.value.guildId
) {
  onBeforeMount(async () => {
    await guildStore.fetchGuildChannels();
  });
}
</script>

<template>
  <div v-if="guildsLoading || configLoading || channelsLoading">
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
