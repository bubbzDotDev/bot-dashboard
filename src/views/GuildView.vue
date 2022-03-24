<script setup>
import { RouterView } from "vue-router";
import GuildNav from "@/components/dashboard/guild/GuildNav.vue";
</script>

<template>
  <div class="guild-grid">
    <GuildNav />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.guild-grid {
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
