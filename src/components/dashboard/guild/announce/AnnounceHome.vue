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
const mainImage = ref({});
const thumbnail = ref({});
const footer = ref({});
const author = ref({});
const hasTimestamp = ref(false);
const fields = ref([]);
const embed = ref({});
const embeds = ref([]);

const color = computed(() => {
  return Number("0x" + colorHex.value.substring(1));
});

const addField = () => {
  fields.value.push({
    name: "",
    value: "",
    inline: false,
    id: Date.now().toString(36) + Math.random().toString(36),
  });
};

const removeField = (id) => {
  fields.value = fields.value.filter((field) => field.id !== id);
};

const sendAnnouncement = async () => {
  if (description.value.length < 1) {
    return;
  }
  try {
    const payload = {};
    embed.value.title = title.value;
    embed.value.url = titleUrl.value;
    embed.value.description = description.value;
    embed.value.image = mainImage.value;
    embed.value.thumbnail = thumbnail.value;
    embed.value.footer = footer.value;
    embed.value.author = author.value;
    embed.value.fields = fields.value;
    if (hasTimestamp.value) embed.value.timestamp = new Date().toISOString();
    embed.value.color = color.value;
    embeds.value.push(embed.value);
    payload.embeds = embeds.value;
    payload.channelId = channelId.value;
    await guildStore.announce(payload);
    channelId.value = "";
    title.value = "";
    description.value = "";
    mainImage.value = {};
    thumbnail.value = {};
    footer.value = {};
    author.value = {};
    fields.value = [];
    hasTimestamp.value = false;
    colorHex.value = "#000000";
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
        <div class="div-wrap">
          <fieldset>
            <legend>Basic Info</legend>
            <label>
              <strong>Channel</strong>
              <em class="required">(required)</em>
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
              <span v-if="colorHex" :style="`background-color: ${colorHex}`"
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
              >
              <input v-model="colorHex" type="color" />
            </label>
            <label>
              <strong>Message</strong>
              <em class="required">(required)</em>
              <textarea v-model.trim="description" required></textarea>
            </label>
          </fieldset>
          <fieldset>
            <legend>Author</legend>
            <label>
              <strong>Name</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="author.name" type="text" />
            </label>
            <label>
              <strong>URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="author.url" type="url" />
            </label>
            <label>
              <strong>Icon URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="author.icon_url" type="url" />
            </label>
          </fieldset>
        </div>
        <div class="div-wrap">
          <fieldset>
            <legend>Title</legend>
            <label>
              <strong>Text</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="title" type="text" />
            </label>
            <label>
              <strong>URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="titleUrl" type="url" />
            </label>
          </fieldset>
          <fieldset>
            <legend>Images</legend>
            <label>
              <strong>Main Image URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="mainImage.url" type="url" />
            </label>
            <label>
              <strong>Thumbnail URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="thumbnail.url" type="url" />
            </label>
          </fieldset>
          <fieldset>
            <legend>Footer</legend>
            <label>
              <strong>Text</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="footer.text" type="text" />
            </label>
            <label>
              <strong>Icon URL</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="footer.icon_url" type="url" />
            </label>
          </fieldset>
        </div>
        <fieldset v-if="fields.length > 0" class="fields-wrap">
          <legend>Field{{ fields.length > 1 ? "s" : "" }}</legend>
          <fieldset v-for="field in fields" :key="field.id">
            <legend>Field {{ fields.indexOf(field) + 1 }}</legend>
            <label>
              <strong>Title</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="field.name" type="text" />
            </label>
            <label>
              <strong>Text</strong>
              <em class="optional">(optional)</em>
              <input v-model.trim="field.value" type="text" />
            </label>
            <label>
              <strong>Side-By-Side</strong>
              <input v-model="field.inline" type="checkbox" />
            </label>
            <button
              @click="removeField(field.id)"
              type="button"
              class="btn-danger"
            >
              REMOVE
            </button>
          </fieldset>
        </fieldset>
        <button
          v-if="fields.length < 25"
          @click="addField"
          type="button"
          class="btn-accent"
        >
          ADD FIELD
        </button>
        <label>
          <strong>Timestamp</strong>
          <input v-model="hasTimestamp" type="checkbox" />
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

fieldset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  text-align: center;
  border: 3px dashed $primary;
  margin: 0.5rem;
}

.div-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.fields-wrap {
  width: unset;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: none;
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
  width: 100%;
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
  margin-top: 1rem;
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

input[type="checkbox"] {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.btn-accent {
  background-color: $accent;
}

.btn-danger {
  background-color: #af1a1a;
  opacity: 0.7;
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
