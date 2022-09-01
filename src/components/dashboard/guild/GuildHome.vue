<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useGuildStore } from "@/stores/guild";
import GuildHeader from "@/components/dashboard/guild/GuildHeader.vue";

const guildStore = useGuildStore();

const guildConfig = ref({});
guildConfig.value = guildStore.getConfig;

const currentGuild = ref({});
currentGuild.value = guildStore.getGuild;

const channels = ref([]);
channels.value = guildStore.getChannels;

const currentChannelId = ref("");
currentChannelId.value = guildConfig.value.welcomeChannelId;

const filteredChannels = channels.value.filter(
  (channel) => currentChannelId.value === channel.id
);

const currentChannel = ref({});
currentChannel.value = filteredChannels[0];
</script>

<template>
  <div class="guild-home">
    <GuildHeader />
    <div v-if="currentGuild.id === guildConfig.guildId">
      <h3>Welcome!</h3>
      <h4>Quick Links:</h4>
      <ul>
        <li>
          <RouterLink :to="`${currentGuild.id}/announce`">
            Announce</RouterLink
          >:
          Build an announcement
        </li>
<!--        <li>-->
<!--          <RouterLink :to="`${currentGuild.id}/settings/prefix`">-->
<!--            Command Prefix</RouterLink-->
<!--          >:-->
<!--          {{ guildConfig.prefix }}-->
<!--        </li>-->
        <li>
          <RouterLink :to="`${currentGuild.id}/settings/welcome`">
            Welcome Channel</RouterLink
          >:
          <span v-if="!currentChannel">Not configured yet</span>
          <span v-else>#{{ currentChannel.name }}</span>
        </li>
        <li>
          <RouterLink :to="`${currentGuild.id}/settings/welcome`">
            Welcome Message</RouterLink
          >:
          <span v-if="!guildConfig.welcomeMessage">Not configured yet</span>
          <span v-else>"{{ guildConfig.welcomeMessage }}"</span>
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
.center,
h4 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: fit-content;
  max-width: 400px;
}

li {
  margin: 1rem;
  line-height: 1.5rem;
}
</style>
