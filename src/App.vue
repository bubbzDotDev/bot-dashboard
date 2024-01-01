<script setup>
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

const userStore = useUserStore();
const menuIsOpen = computed(() => userStore.getMenuIsOpen);
</script>

<template>
  <div class="app-grid" :class="{ 'no-scroll': menuIsOpen }">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/main.scss" as *;
</style>
