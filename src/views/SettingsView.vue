<script setup>
import { RouterView } from "vue-router";
import GuildHeader from "@/components/dashboard/guild/GuildHeader.vue";
</script>

<template>
  <div>
    <GuildHeader />
    <RouterView />
  </div>
</template>
