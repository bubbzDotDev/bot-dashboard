<script setup>
import { ref, watch } from "vue";
import { useGuildStore } from "@/stores/guild";
import { getGuildIconURL } from "@/utils/helpers";

const guildStore = useGuildStore();

const currentGuild = ref({});
currentGuild.value = guildStore.getGuild;
watch(
  () => guildStore.getGuild,
  () => {
    currentGuild.value = guildStore.getGuild;
  }
);
</script>

<template>
  <div class="guild-header">
    <fieldset>
      <legend>Your Server</legend>
      <div v-if="currentGuild.icon" class="guild-image-container">
        <img
          :src="getGuildIconURL(currentGuild)"
          alt="Server icon"
          height="32"
          width="32"
        />
      </div>
      <h2>{{ currentGuild.name }}</h2>
    </fieldset>
    <hr />
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;
.guild-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  margin: 0;
}

fieldset {
  border: 3px dashed $primary;
  padding: 1rem 1.5rem;
  position: relative;
  margin: 1.5rem;
  border-radius: 5px;
}

legend {
  text-align: center;
}

.guild-image-container {
  position: absolute;
  top: -30px;
  left: -21px;
  background-color: $primary;
  border-radius: 50%;
  padding: 1px;
  border: 3px solid $link-light;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 50%;
  }
}

hr {
  height: 3px;
  background-color: $primary;
  border: none;
  width: 95%;
  border-radius: 2px;
}
</style>
