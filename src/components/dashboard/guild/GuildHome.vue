<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const guilds = ref([]);
guilds.value = userStore.getMutualGuilds;

const guildId = ref(null);
const route = useRoute();
guildId.value = route.params.id;

const matchingGuild = guilds.value.filter((guild) => {
  return guild.id === guildId.value;
});

const router = useRouter();

if (!matchingGuild.length) {
  router.push({ name: "not-found" });
}

const currentGuild = ref({});
currentGuild.value = matchingGuild[0];
</script>

<template>
  <div>
    <h2>{{ currentGuild.name }}</h2>
  </div>
</template>

<style lang="scss" scoped></style>
