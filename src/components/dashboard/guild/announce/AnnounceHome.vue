<script setup>
import { computed, ref } from "vue";
import { useGuildStore } from "@/stores/guild";
import GuildHeader from "@/components/dashboard/guild/GuildHeader.vue";

const guildStore = useGuildStore();
const channels = ref([]);
channels.value = guildStore.getChannels;

const channelId = ref("");
const colorHex = ref("#000000");
const title = ref("");
const titleUrl = ref("");

const description = ref("");
const embed = ref({});
const embeds = ref([]);

const color = computed(() => {
  return Number('0x' + colorHex.value.substring(1));
})

const sendAnnouncement = async () => {
  try {
    const payload = {};
    embed.value.title = title.value;
    embed.value.url = titleUrl.value;
    embed.value.description = description.value;
    embed.value.color = color.value;
    embeds.value.push(embed.value);
    payload.embeds = embeds.value;
    payload.channelId = channelId.value;
    await guildStore.announce(payload);
    channelId.value = "";
    title.value = "";
    description.value = "";
    colorHex.value="#000000"
    titleUrl.value = "";
    embeds.value = [];
    embed.value = {};
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div>
    <GuildHeader />
    <h3>Announce</h3>
    <div class="announce-container">
      <form @submit.prevent="sendAnnouncement">
        <label>
          <strong>Channel</strong>
          <select v-model="channelId" required>
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
        <label>
          <strong>Color</strong>
          <span v-if="colorHex" :style="`background-color: ${colorHex}`">&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input v-model="colorHex" type="color" />
        </label>
        <label>
          <strong>Title</strong>
          <em class="optional">(optional)</em>
          <input v-model="title" type="text" />
        </label>
        <label>
          <strong>Title URL</strong>
          <em class="optional">(optional)</em>
          <input v-model="titleUrl" type="url" />
        </label>
        <label>
          <strong>Description</strong>
          <em class="required">(required)</em>
          <textarea v-model="description" required></textarea>
        </label>
        <button type="submit">SEND</button>
      </form>
<!--      <div class="embed-preview-container">-->
<!--        <div class="embed-left-border"></div>-->
<!--        <div class="embed-main-section">-->

<!--        </div>-->
<!--        <div class="embed-right-section">-->

<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
}

select,
input {
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
  margin-bottom: 1rem;
}

.announce-container {
  //display: flex;
  //flex-wrap: wrap;
}

em {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.25rem;
}

.optional {
  color: #117a11;
}

.required {
  color: #af1a1a;
}

//.embed-preview-container {
//  display: flex;
//}
//
//.embed-left-border {
//  width: 4px;
//  border-radius: 4px 0 0 4px;
//  background-color: #000;
//}
//
//.embed-main-section {
//  background-color: #2f3136;
//}
//
//.embed-right-section {
//  background-color: #2f3136;
//}
</style>
