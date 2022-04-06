<script setup>
import { ref, watch } from "vue";
import { useGuildStore } from "@/stores/guild";

const guildStore = useGuildStore();

const guildConfig = ref({});

const currentChannelId = ref({});
const updatedChannelId = ref({});

guildConfig.value = guildStore.getConfig;

currentChannelId.value = guildConfig.value.welcomeChannelId;
updatedChannelId.value = guildConfig.value.welcomeChannelId;

const updatedChannel = ref({});

watch(
  () => guildStore.getConfig,
  () => {
    guildConfig.value = guildStore.getConfig;
    updatedChannelId.value = guildConfig.value.welcomeChannelId;

    const filteredChannelsUpdated = channels.value.filter(
      (channel) => updatedChannelId.value === channel.id
    );

    updatedChannel.value = filteredChannelsUpdated[0];
  }
);

const channels = ref([]);
channels.value = guildStore.getChannels;

const filteredChannels = channels.value.filter(
  (channel) => currentChannelId.value === channel.id
);

updatedChannel.value = filteredChannels[0];

const message = ref(`Hi {member}!`);

const loading = ref(false);
loading.value = guildStore.getWelcomeLoading;
watch(
  () => guildStore.getWelcomeLoading,
  () => {
    loading.value = guildStore.getWelcomeLoading;
  }
);

const updateWelcome = async () => {
  try {
    await guildStore.setWelcomeChannel(currentChannelId.value);
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div v-if="loading">
    <h3>Loading...</h3>
  </div>
  <div v-else>
    <h3>Update Welcome Message</h3>
    <form>
      <label>
        <span
          >Current Channel:
          <span v-if="updatedChannel.name">#{{ updatedChannel.name }}</span
          ><span v-else>Not configured yet</span></span
        >
        <select v-model="currentChannelId">
          <option
            v-for="channel in channels"
            :key="channel.id"
            :value="channel.id"
          >
            #{{ channel.name }}
          </option>
        </select>
      </label>
      <label>
        Current Message:
        <textarea v-model="message"></textarea>
      </label>
      <button @click="updateWelcome" type="button">UPDATE</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
}

select {
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
  margin: 0.25rem;
}

textarea {
  width: 300px;
  height: 100px;
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
  font-size: 1rem;
  margin: 0.25rem;
}

button {
  @include button;
  width: 100px;
  margin-bottom: 1rem;
}
</style>
