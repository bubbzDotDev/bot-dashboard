<script setup>
// import { ref, watch } from "vue";
// import { useGuildStore } from "@/stores/guild";
import GuildHeader from "@/components/dashboard/guild/GuildHeader.vue";

// const guildStore = useGuildStore();

// const currentGuild = ref({});
// currentGuild.value = guildStore.getGuild;
// watch(
//   () => guildStore.getGuild,
//   () => {
//     currentGuild.value = guildStore.getGuild;
//   }
// );
</script>

<template>
  <div class="guild-home">
    <GuildHeader />
  </div>
</template>

<style lang="scss" scoped></style>
