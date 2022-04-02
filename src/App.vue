<script setup>
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";

const userStore = useUserStore();
const menuIsOpen = ref(false);
menuIsOpen.value = userStore.getMenuIsOpen;

watch(
  () => userStore.getMenuIsOpen,
  () => {
    menuIsOpen.value = userStore.getMenuIsOpen;
  }
);
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
