<script setup>
import { computed, ref } from "vue";
import { useGuildStore } from "@/stores/guild";

const guildStore = useGuildStore();

const guildConfig = computed(() => guildStore.getConfig);

const currentChannelId = ref("");
const updatedChannelId = ref("");
const welcomeMessage = ref("");
const updatedWelcomeMessage = ref("");

currentChannelId.value = guildConfig.value.welcomeChannelId;
updatedChannelId.value = guildConfig.value.welcomeChannelId;
welcomeMessage.value = guildConfig.value.welcomeMessage;
updatedWelcomeMessage.value = guildConfig.value.welcomeMessage;

const updatedChannel = ref({});

const channels = computed(() => guildStore.getChannels);

updatedChannel.value = channels.value.find(
  (channel) => currentChannelId.value === channel.id,
);

const loading = computed(() => guildStore.getWelcomeLoading);

async function updateWelcome() {
  await guildStore.setWelcome(currentChannelId.value, welcomeMessage.value);
}

async function disableWelcome() {
  welcomeMessage.value = "";
  currentChannelId.value = "";
  await guildStore.setWelcome("", "");
}
</script>

<template>
  <div v-if="loading">
    <h3>Loading...</h3>
  </div>
  <div v-else>
    <h3>Update Welcome Settings</h3>
    <form @submit.prevent="updateWelcome">
      <label>
        <strong>Welcome Message:</strong>
        <br />
        <span v-if="!updatedWelcomeMessage">Not configured yet</span>
        <span v-else>{{ updatedWelcomeMessage }}</span>
        <br />
        <textarea v-model="welcomeMessage" required></textarea>
      </label>
      <p>
        Use <strong>{member}</strong> to tag new members when they join your
        server.
      </p>
      <label>
        <strong>Welcome Channel:</strong>
        <br />
        <span v-if="!updatedChannel">Not configured yet</span>
        <span v-else>#{{ updatedChannel.name }}</span>
        <br />
        <select v-model="currentChannelId" required>
          <option disabled value="">Select a channel</option>
          <option
            v-for="channel in channels"
            :key="channel.id"
            :value="channel.id"
          >
            #{{ channel.name }}
          </option>
        </select>
      </label>
      <div>
        <button type="submit">UPDATE</button>
        <button
          @click="disableWelcome"
          v-if="updatedChannel"
          class="btn-danger"
          type="button"
        >
          DISABLE
        </button>
      </div>
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

span,
p {
  text-align: center;
}

p {
  margin-top: 0;

  span {
    margin-top: 0.5rem;
  }
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
  width: 100px;
  margin: 1rem;
}

.btn-danger {
  background-color: #af1a1a;
  opacity: 0.7;
}
</style>
