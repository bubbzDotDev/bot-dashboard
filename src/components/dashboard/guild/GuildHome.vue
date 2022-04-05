<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useGuildStore } from "@/stores/guild";
import GuildHeader from "@/components/dashboard/guild/GuildHeader.vue";

const guildStore = useGuildStore();

const guildConfig = ref({});
guildConfig.value = guildStore.getConfig;
watch(
  () => guildStore.getConfig,
  () => {
    guildConfig.value = guildStore.getConfig;
  }
);

const loading = ref(false);
loading.value = guildStore.getConfigLoading;
watch(
  () => guildStore.getConfigLoading,
  () => {
    loading.value = guildStore.getConfigLoading;
  }
);

const currentGuild = ref({});
currentGuild.value = guildStore.getGuild;
watch(
  () => guildStore.getGuild,
  () => {
    currentGuild.value = guildStore.getGuild;
  }
);

if (
  (guildConfig.value &&
    Object.keys(guildConfig.value).length === 0 &&
    Object.getPrototypeOf(guildConfig.value) === Object.prototype) ||
  currentGuild.value.id != guildConfig.value.guildId
) {
  onBeforeMount(async () => {
    await guildStore.fetchGuildConfig();
  });
}
</script>

<template>
  <div class="guild-home">
    <GuildHeader />
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-else-if="currentGuild.id === guildConfig.guildId">
      <h3>Current Settings</h3>
      <ul>
        <li>
          <RouterLink :to="`${currentGuild.id}/settings/prefix`">
            Command Prefix</RouterLink
          >:
          {{ guildConfig.prefix }}
        </li>
      </ul>
    </div>
    <div v-else>
      <h3>Server settings not available</h3>
      <p class="center">
        Run any command in your server to allow the bot to link up with the
        dashboard.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: fit-content;
}
</style>
