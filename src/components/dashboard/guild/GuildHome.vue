<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const guildId = ref(null);

const guilds = [
  {
    id: "123",
    name: "Server 1",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
  {
    id: "124",
    name: "Server 2",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
  {
    id: "125",
    name: "Server 3",
    icon: new URL("../../assets/images/heart-32px.png", import.meta.url).href,
  },
];

const route = useRoute();

guildId.value = route.params.id;

const matchingGuild = guilds.filter((guild) => {
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
