<script setup>
import { ref, watch } from "vue";
import { useGuildStore } from "@/stores/guild";

const guildStore = useGuildStore();

const guildConfig = ref({});

const prefix = ref("");
const updatedPrefix = ref("");

guildConfig.value = guildStore.getConfig;

prefix.value = guildConfig.value.prefix;
updatedPrefix.value = guildConfig.value.prefix;

watch(
  () => guildStore.getConfig,
  () => {
    guildConfig.value = guildStore.getConfig;
    updatedPrefix.value = guildConfig.value.prefix;
  }
);

const loading = ref(false);
loading.value = guildStore.getPrefixLoading;
watch(
  () => guildStore.getPrefixLoading,
  () => {
    loading.value = guildStore.getPrefixLoading;
  }
);

const updatePrefix = async () => {
  try {
    await guildStore.setGuildPrefix(prefix.value);
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
    <h3>Update Command Prefix</h3>
    <form>
      <label>
        Current Prefix: {{ updatedPrefix }}
        <input v-model="prefix" type="text" />
      </label>
      <button @click="updatePrefix" type="button">UPDATE</button>
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
}

input {
  width: 50px;
  background-color: $primary-light;
  padding: 0.5rem;
  border: 3px solid $primary;
  font-size: 2rem;
  font-weight: bold;
  margin: 0.25rem;
}

button {
  @include button;
  width: 100px;
  margin-bottom: 1rem;
}
</style>
