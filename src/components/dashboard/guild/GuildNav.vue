<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import MenuButton from "@/components/dashboard/guild/MenuButton.vue";

const guildId = ref(null);
const route = useRoute();
guildId.value = route.params.id;

const menuIsOpen = ref(false);

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value;
};
</script>

<template>
  <div class="nav">
    <nav :class="{ 'menu-open': menuIsOpen }">
      <ul>
        <li>
          <RouterLink to="/dashboard" @click="toggleMenu"
            >Server List</RouterLink
          >
        </li>
        <li>
          <RouterLink :to="`/dashboard/${guildId}`" @click="toggleMenu"
            >Server Home</RouterLink
          >
        </li>
        <li><RouterLink to="/" @click="toggleMenu">Embeds</RouterLink></li>
        <li>
          <RouterLink :to="`/dashboard/${guildId}/settings`" @click="toggleMenu"
            >Settings</RouterLink
          >
        </li>
      </ul>
      <MenuButton :menuOpen="menuIsOpen" @toggle-menu="toggleMenu" />
    </nav>
    <div @click="toggleMenu" class="backdrop"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/main.scss" as *;

nav {
  background-color: $accent;
  margin-top: -128px;
  z-index: 0;
  transition: 0.25s;
  overflow-y: hidden;

  @include breakpoint("small") {
    margin-top: 0;
  }
}

.menu-open {
  margin-top: 0;
}

.menu-open ~ .backdrop {
  background-color: black;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 100;
  margin-top: 295px;
  transition: 0.25s;

  @include breakpoint("small") {
    display: none;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;

  @include breakpoint("small") {
    flex-direction: row;
    max-width: 700px;
    margin: 0 auto;
  }
}

li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

a.router-link-exact-active,
a:hover {
  color: $primary-light;
  background-color: $link-dark;
}

a {
  text-decoration: none;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  transition: 0.25s;

  @include breakpoint("medium") {
    width: fit-content;
  }
}
</style>
